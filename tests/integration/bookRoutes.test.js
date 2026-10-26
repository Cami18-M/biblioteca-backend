jest.mock('../../src/models/bookModel', () => require('../mocks/bookModel'));
jest.mock('../../src/models/transactionModel', () => require('../mocks/transactionModel'));

const { createMockQuery } = require('../mocks/queryHelper');
const request = require('supertest');
const app = require('../../src/app');
const Book = require('../../src/models/bookModel');

const bookData = {
  title: 'Código Limpio',
  author: 'Robert C. Martin',
  isbn: '978-0132350884',
  publishedYear: 2008,
  stock: 3,
  category: 'Programación'
};

describe('Integration - bookRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/books', () => {
    test('debe crear un libro (201)', async () => {
      Book.create.mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
        ...bookData
      });

      const res = await request(app)
        .post('/api/books')
        .send({ ...bookData, isbn: '978-0132350885' });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
    });
  });

  describe('GET /api/books', () => {
    test('debe listar libros (200)', async () => {
      Book.find.mockReturnValue(
        createMockQuery([{ ...bookData, _id: '507f1f77bcf86cd799439011' }])
      );
      const res = await request(app).get('/api/books');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
    });
  });

  describe('GET /api/books/:id', () => {
    test('debe devolver libro por ID válido (200)', async () => {
      Book.findById.mockReturnValue(
        createMockQuery({ ...bookData, _id: '507f1f77bcf86cd799439011' })
      );
      const res = await request(app).get('/api/books/507f1f77bcf86cd799439011');
      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe(bookData.title);
    });

    test('debe devolver 404 si no existe', async () => {
      Book.findById.mockReturnValue(createMockQuery(null));
      const res = await request(app).get('/api/books/000000000000000000000000');
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/books/:id', () => {
    test('debe actualizar un libro (200)', async () => {
      Book.findByIdAndUpdate.mockResolvedValue({
        ...bookData,
        _id: '507f1f77bcf86cd799439011',
        title: 'Título Actualizado'
      });
      const res = await request(app)
        .put('/api/books/507f1f77bcf86cd799439011')
        .send({ title: 'Título Actualizado' });
      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('Título Actualizado');
    });

    test('debe devolver 404 si no existe', async () => {
      Book.findByIdAndUpdate.mockResolvedValue(null);
      const res = await request(app)
        .put('/api/books/000000000000000000000000')
        .send({ title: 'X' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/books/:id', () => {
    test('debe eliminar un libro (200)', async () => {
      Book.findByIdAndDelete.mockResolvedValue({ _id: '507f1f77bcf86cd799439011' });
      const res = await request(app).delete('/api/books/507f1f77bcf86cd799439011');
      expect(res.status).toBe(200);
    });

    test('debe devolver 404 si no existe', async () => {
      Book.findByIdAndDelete.mockResolvedValue(null);
      const res = await request(app).delete('/api/books/000000000000000000000000');
      expect(res.status).toBe(404);
    });
  });
});
