const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas las rutas transaccionales requieren un token JWT válido
router.use(authMiddleware);

// Rutas de préstamos bajo /api/transactions

/**
 * POST /api/transactions - Registrar el préstamo de un libro
 */
router.post('/', transactionController.createTransaction);

/**
 * GET /api/transactions - Listar transacciones (clientes: solo las propias)
 */
router.get('/', transactionController.getAllTransactions);

/**
 * GET /api/transactions/me - Listar los préstamos del usuario autenticado
 */
router.get('/me', transactionController.getMyTransactions);

/**
 * GET /api/transactions/:id - Obtener una transacción por ID
 */
router.get('/:id', transactionController.getTransactionById);

/**
 * PATCH /api/transactions/:id/return - Registrar la devolución de un préstamo
 */
router.patch('/:id/return', transactionController.returnBook);

module.exports = router;
