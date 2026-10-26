const transactionService = require('../services/transactionService');

/**
 * Controlador de transacciones - Manejo de peticiones HTTP para préstamos
 */

/**
 * POST /api/transactions
 * Registra el préstamo de un libro para el usuario autenticado.
 * Un administrador puede prestar a nombre de otro usuario enviando `user` en el body.
 */
const createTransaction = async (req, res, next) => {
  try {
    const requestedUser = req.body.user;
    const userId =
      req.user.role === 'admin' && requestedUser ? requestedUser : req.user.id;

    const transaction = await transactionService.createTransaction({
      userId,
      bookId: req.body.book,
      dueDate: req.body.dueDate
    });

    res.status(201).json({
      success: true,
      message: 'Préstamo registrado exitosamente',
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/transactions
 * Lista las transacciones. Un cliente solo ve las propias; un admin ve todas.
 * Filtros: status, user, book.
 */
const getAllTransactions = async (req, res, next) => {
  try {
    const filters = { ...req.query };

    if (req.user.role !== 'admin') {
      filters.user = req.user.id;
    }

    const transactions = await transactionService.getAllTransactions(filters);

    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/transactions/me
 * Lista los préstamos del usuario autenticado.
 */
const getMyTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionService.getTransactionsByUser(req.user.id);

    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/transactions/:id
 * Obtiene una transacción por su ID.
 */
const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await transactionService.getTransactionById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: { message: 'Préstamo no encontrado' }
      });
    }

    // Un cliente solo puede consultar sus propios préstamos
    const isOwner = String(transaction.user?._id) === String(req.user.id);
    if (req.user.role !== 'admin' && !isOwner) {
      return res.status(403).json({
        success: false,
        error: { message: 'No tiene permiso para consultar este préstamo' }
      });
    }

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/transactions/:id/return
 * Registra la devolución de un préstamo.
 */
const returnBook = async (req, res, next) => {
  try {
    const transaction = await transactionService.returnBook(req.params.id, {
      userId: req.user.id,
      role: req.user.role
    });

    res.json({
      success: true,
      message: 'Devolución registrada exitosamente',
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getMyTransactions,
  getTransactionById,
  returnBook
};
