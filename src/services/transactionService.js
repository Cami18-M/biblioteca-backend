const mongoose = require('mongoose');
const Transaction = require('../models/transactionModel');
const Book = require('../models/bookModel');
const User = require('../models/userModel');

// Servicios transaccionales - Lógica de negocio de préstamos y devoluciones

const LOAN_PERIOD_DAYS = Number(process.env.LOAN_PERIOD_DAYS) || 14;
const { TRANSACTION_STATUSES } = Transaction;

const USER_FIELDS = 'name email role';
const BOOK_FIELDS = 'title author isbn category stock';

/**
 * Crea un error con código HTTP para que lo maneje errorMiddleware.
 */
const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/**
 * Valida que un ID tenga formato de ObjectId de MongoDB.
 */
const assertValidId = (id, label = 'ID') => {
  if (!mongoose.isValidObjectId(id)) {
    throw createError(`${label} inválido`, 400);
  }
};

/**
 * Suma días a una fecha.
 */
const addDays = (date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

/**
 * Actualiza a 'overdue' los préstamos activos cuya fecha de vencimiento ya pasó.
 * @returns {Promise<Number>} Cantidad de préstamos marcados como vencidos
 */
const markOverdueTransactions = async () => {
  const result = await Transaction.updateMany(
    { status: 'active', dueDate: { $lt: new Date() } },
    { $set: { status: 'overdue' } }
  );

  return result.modifiedCount || 0;
};

/**
 * Registra el préstamo de un libro y descuenta un ejemplar del stock.
 * @param {Object} loanData - Datos del préstamo (userId, bookId, dueDate)
 * @returns {Promise<Object>} Transacción creada
 */
const createTransaction = async ({ userId, bookId, dueDate } = {}) => {
  if (!userId || !bookId) {
    throw createError('El usuario y el libro son obligatorios', 400);
  }

  assertValidId(userId, 'ID de usuario');
  assertValidId(bookId, 'ID de libro');

  const user = await User.findById(userId);
  if (!user) {
    throw createError('Usuario no encontrado', 404);
  }

  const borrowDate = new Date();

  let due;
  if (dueDate) {
    due = new Date(dueDate);
    if (Number.isNaN(due.getTime())) {
      throw createError('La fecha de vencimiento no es válida', 400);
    }
    if (due <= borrowDate) {
      throw createError('La fecha de vencimiento debe ser posterior a la fecha de préstamo', 400);
    }
  } else {
    due = addDays(borrowDate, LOAN_PERIOD_DAYS);
  }

  // Descuento atómico del stock: solo si hay ejemplares disponibles
  const book = await Book.findOneAndUpdate(
    { _id: bookId, stock: { $gt: 0 } },
    { $inc: { stock: -1 } },
    { returnDocument: 'after' }
  );

  if (!book) {
    const exists = await Book.exists({ _id: bookId });
    if (!exists) {
      throw createError('Libro no encontrado', 404);
    }
    throw createError('No hay ejemplares disponibles de este libro', 409);
  }

  try {
    const transaction = await Transaction.create({
      user: userId,
      book: bookId,
      borrowDate,
      dueDate: due,
      status: 'active'
    });

    return await transaction.populate([
      { path: 'user', select: USER_FIELDS },
      { path: 'book', select: BOOK_FIELDS }
    ]);
  } catch (error) {
    // Si falla la creación, se devuelve el ejemplar al stock para no dejarlo bloqueado
    await Book.findByIdAndUpdate(bookId, { $inc: { stock: 1 } });

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((item) => item.message);
      throw createError(messages.join('. '), 400);
    }

    throw error;
  }
};

/**
 * Registra la devolución de un préstamo y devuelve el ejemplar al stock.
 * @param {String} id - ID de la transacción
 * @param {Object} actor - Usuario autenticado ({ userId, role })
 * @returns {Promise<Object>} Transacción actualizada
 */
const returnBook = async (id, actor = {}) => {
  assertValidId(id, 'ID de transacción');

  await markOverdueTransactions();

  const transaction = await Transaction.findById(id);
  if (!transaction) {
    throw createError('Préstamo no encontrado', 404);
  }

  if (transaction.status === 'returned') {
    throw createError('Este préstamo ya fue devuelto', 409);
  }

  // Un cliente solo puede devolver sus propios préstamos; un admin, cualquiera
  const isOwner = String(transaction.user) === String(actor.userId);
  if (actor.role && actor.role !== 'admin' && !isOwner) {
    throw createError('No tiene permiso para devolver este préstamo', 403);
  }

  // Actualización condicional para evitar devoluciones duplicadas por concurrencia
  const returned = await Transaction.findOneAndUpdate(
    { _id: id, status: { $ne: 'returned' } },
    { $set: { status: 'returned', returnDate: new Date() } },
    { returnDocument: 'after' }
  );

  if (!returned) {
    throw createError('Este préstamo ya fue devuelto', 409);
  }

  await Book.findByIdAndUpdate(returned.book, { $inc: { stock: 1 } });

  return await returned.populate([
    { path: 'user', select: USER_FIELDS },
    { path: 'book', select: BOOK_FIELDS }
  ]);
};

/**
 * Lista las transacciones aplicando filtros opcionales.
 * @param {Object} filters - Filtros (status, user, book)
 * @returns {Promise<Array>} Lista de transacciones
 */
const getAllTransactions = async ({ status, user, book } = {}) => {
  await markOverdueTransactions();

  const query = {};

  if (status) {
    if (!TRANSACTION_STATUSES.includes(status)) {
      throw createError(`El estado debe ser uno de: ${TRANSACTION_STATUSES.join(', ')}`, 400);
    }
    query.status = status;
  }

  if (user) {
    assertValidId(user, 'ID de usuario');
    query.user = user;
  }

  if (book) {
    assertValidId(book, 'ID de libro');
    query.book = book;
  }

  return await Transaction.find(query)
    .populate('user', USER_FIELDS)
    .populate('book', BOOK_FIELDS)
    .sort({ borrowDate: -1 });
};

/**
 * Lista las transacciones de un usuario.
 * @param {String} userId - ID del usuario
 * @returns {Promise<Array>} Lista de transacciones del usuario
 */
const getTransactionsByUser = async (userId) => {
  return await getAllTransactions({ user: userId });
};

/**
 * Obtiene una transacción por su ID.
 * @param {String} id - ID de la transacción
 * @returns {Promise<Object|null>} Transacción encontrada o null
 */
const getTransactionById = async (id) => {
  assertValidId(id, 'ID de transacción');

  await markOverdueTransactions();

  return await Transaction.findById(id)
    .populate('user', USER_FIELDS)
    .populate('book', BOOK_FIELDS);
};

module.exports = {
  createTransaction,
  returnBook,
  getAllTransactions,
  getTransactionsByUser,
  getTransactionById,
  markOverdueTransactions
};
