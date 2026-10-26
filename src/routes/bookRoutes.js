const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Rutas del catálogo de libros bajo /api/books

/**
 * POST /api/books - Registrar un libro en el catálogo
 */
router.post('/', bookController.createBook);

/**
 * GET /api/books - Listar libros (filtros: category, author, title, search, available)
 */
router.get('/', bookController.getAllBooks);

/**
 * GET /api/books/:id - Obtener un libro por ID
 */
router.get('/:id', bookController.getBookById);

/**
 * PUT /api/books/:id - Actualizar un libro por ID
 */
router.put('/:id', bookController.updateBook);

/**
 * DELETE /api/books/:id - Eliminar un libro por ID
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
