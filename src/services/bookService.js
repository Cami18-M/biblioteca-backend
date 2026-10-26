const mongoose = require('mongoose');
const Book = require('../models/bookModel');
const Transaction = require('../models/transactionModel');

// Servicios de catálogo - Lógica de negocio de libros

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
 * Escapa los caracteres especiales de una expresión regular
 * para evitar que el texto de búsqueda rompa la consulta.
 */
const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Traduce los errores de validación/duplicado de Mongoose
 * a errores HTTP con un mensaje entendible.
 */
const handleMongooseError = (error) => {
  if (error.code === 11000) {
    throw createError('Ya existe un libro registrado con ese ISBN', 409);
  }

  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((item) => item.message);
    throw createError(messages.join('. '), 400);
  }

  throw error;
};

/**
 * Crea un libro en el catálogo.
 * @param {Object} bookData - Datos del libro
 * @returns {Promise<Object>} Libro creado
 */
const createBook = async (bookData = {}) => {
  try {
    return await Book.create(bookData);
  } catch (error) {
    return handleMongooseError(error);
  }
};

/**
 * Lista los libros del catálogo aplicando filtros opcionales.
 * @param {Object} filters - Filtros (category, author, title, search, available)
 * @returns {Promise<Array>} Lista de libros
 */
const getAllBooks = async ({ category, author, title, search, available } = {}) => {
  const query = {};

  if (category) {
    query.category = new RegExp(`^${escapeRegExp(category.trim())}$`, 'i');
  }

  if (author) {
    query.author = new RegExp(escapeRegExp(author.trim()), 'i');
  }

  if (title) {
    query.title = new RegExp(escapeRegExp(title.trim()), 'i');
  }

  // Búsqueda general por título, autor o ISBN
  if (search) {
    const term = new RegExp(escapeRegExp(search.trim()), 'i');
    query.$or = [{ title: term }, { author: term }, { isbn: term }];
  }

  // Solo libros con ejemplares disponibles para prestar
  if (available === 'true' || available === true) {
    query.stock = { $gt: 0 };
  }

  return await Book.find(query).sort({ title: 1 });
};

/**
 * Obtiene un libro por su ID.
 * @param {String} id - ID del libro
 * @returns {Promise<Object|null>} Libro encontrado o null
 */
const getBookById = async (id) => {
  assertValidId(id, 'ID de libro');
  return await Book.findById(id);
};

/**
 * Actualiza un libro por su ID.
 * @param {String} id - ID del libro
 * @param {Object} updateData - Datos a actualizar
 * @returns {Promise<Object|null>} Libro actualizado o null
 */
const updateBook = async (id, updateData = {}) => {
  assertValidId(id, 'ID de libro');

  // Campos que el cliente no puede modificar directamente
  const { _id, createdAt, updatedAt, ...data } = updateData;

  try {
    return await Book.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true
    });
  } catch (error) {
    return handleMongooseError(error);
  }
};

/**
 * Elimina un libro por su ID.
 * No permite eliminar libros con préstamos vigentes.
 * @param {String} id - ID del libro
 * @returns {Promise<Object|null>} Libro eliminado o null
 */
const deleteBook = async (id) => {
  assertValidId(id, 'ID de libro');

  const activeLoans = await Transaction.countDocuments({
    book: id,
    status: { $in: ['active', 'overdue'] }
  });

  if (activeLoans > 0) {
    throw createError('No se puede eliminar un libro con préstamos activos o vencidos', 409);
  }

  return await Book.findByIdAndDelete(id);
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
