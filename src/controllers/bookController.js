const bookService = require('../services/bookService');

/**
 * Controlador de libros - Manejo de peticiones HTTP para el catálogo
 */

/**
 * POST /api/books
 * Registra un libro en el catálogo.
 */
const createBook = async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body);

    res.status(201).json({
      success: true,
      message: 'Libro registrado exitosamente',
      data: book
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/books
 * Lista los libros del catálogo.
 * Filtros: category, author, title, search, available.
 */
const getAllBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks(req.query);

    res.json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/books/:id
 * Obtiene un libro por su ID.
 */
const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: { message: 'Libro no encontrado' }
      });
    }

    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/books/:id
 * Actualiza un libro del catálogo.
 */
const updateBook = async (req, res, next) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: { message: 'Libro no encontrado' }
      });
    }

    res.json({
      success: true,
      message: 'Libro actualizado exitosamente',
      data: book
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/books/:id
 * Elimina un libro del catálogo.
 */
const deleteBook = async (req, res, next) => {
  try {
    const book = await bookService.deleteBook(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: { message: 'Libro no encontrado' }
      });
    }

    res.json({
      success: true,
      message: 'Libro eliminado exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
