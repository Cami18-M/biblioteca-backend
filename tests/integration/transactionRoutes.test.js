jest.mock('../../src/models/userModel', () => require('../mocks/userModel'));
jest.mock('../../src/models/bookModel', () => require('../mocks/bookModel'));
jest.mock('../../src/models/transactionModel', () => require('../mocks/transactionModel'));

const { createMockQuery } = require('../mocks/queryHelper');
const request = require('supertest');
const app = require('../../src/app');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/userModel');
const Book = require('../../src/models/bookModel');
const Transaction = require('../../src/models/transactionModel');

const userData = {
  name: 'Usuario Test',
  email: 'test@example.com',
  password: 'Password123'
};

let token;

beforeEach(() => {
  jest.clearAllMocks();
  token = jwt.sign(
    { id: '507f1f77bcf86cd799439011', email: userData.email, role: 'client' },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
});

describe('Integration - transactionRoutes', () => {
  describe('POST /api/transactions', () => {
    test('debe registrar un préstamo con token válido (201)', async () => {
      User.findById.mockReturnValue(
        createMockQuery({ _id: '507f1f77bcf86cd799439011', ...userData, password: undefined })
      );
      Book.findOneAndUpdate.mockResolvedValue({ _id: '507f1f77bcf86cd799439012', stock: 1 });
      Transaction.create.mockResolvedValue({
        _id: '507f1f77bcf86cd799439013',
        status: 'active',
        dueDate: new Date(),
        populate: jest.fn().mockResolvedValue({ _id: '507f1f77bcf86cd799439013', status: 'active' })
      });

      const res = await request(app)
        .post('/api/transactions')
        .set('Authorization', `Bearer ${token}`)
        .send({ book: '507f1f77bcf86cd799439012' });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
    });

    test('debe devolver 401 sin token', async () => {
      const res = await request(app).post('/api/transactions').send({ book: '507f1f77bcf86cd799439012' });
      expect(res.status).toBe(401);
    });

    test('debe devolver 409 si no hay stock', async () => {
      User.findById.mockReturnValue(
        createMockQuery({ _id: '507f1f77bcf86cd799439011', ...userData, password: undefined })
      );
      Book.findOneAndUpdate.mockResolvedValue(null);
      Book.exists.mockResolvedValue(true);

      const res = await request(app)
        .post('/api/transactions')
        .set('Authorization', `Bearer ${token}`)
        .send({ book: '507f1f77bcf86cd799439012' });
      expect(res.status).toBe(409);
    });
  });

  describe('GET /api/transactions', () => {
    test('debe listar préstamos del usuario autenticado (200)', async () => {
      Transaction.updateMany.mockResolvedValue({ modifiedCount: 0 });
      Transaction.find.mockReturnValue(createMockQuery([]));
      const res = await request(app)
        .get('/api/transactions')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('debe devolver 401 sin token', async () => {
      const res = await request(app).get('/api/transactions');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/transactions/me', () => {
    test('debe devolver préstamos del usuario autenticado (200)', async () => {
      Transaction.updateMany.mockResolvedValue({ modifiedCount: 0 });
      Transaction.find.mockReturnValue(
        createMockQuery([{ _id: '507f1f77bcf86cd799439013' }])
      );
      const res = await request(app)
        .get('/api/transactions/me')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
    });
  });

  describe('GET /api/transactions/:id', () => {
    test('debe devolver préstamo por ID (200)', async () => {
      Transaction.updateMany.mockResolvedValue({ modifiedCount: 0 });
      Transaction.findById.mockReturnValue(
        createMockQuery({
          _id: '507f1f77bcf86cd799439013',
          user: { _id: '507f1f77bcf86cd799439011' },
          populate: jest.fn().mockResolvedValue({ _id: '507f1f77bcf86cd799439013' })
        })
      );
      const res = await request(app)
        .get('/api/transactions/507f1f77bcf86cd799439013')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    test('debe devolver 404 si no existe', async () => {
      Transaction.updateMany.mockResolvedValue({ modifiedCount: 0 });
      Transaction.findById.mockReturnValue(createMockQuery(null));
      const res = await request(app)
        .get('/api/transactions/000000000000000000000000')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(404);
    });
  });

  describe('PATCH /api/transactions/:id/return', () => {
    test('debe registrar devolución (200)', async () => {
      Transaction.updateMany.mockResolvedValue({ modifiedCount: 0 });
      Transaction.findById.mockReturnValue(
        createMockQuery({
          _id: '507f1f77bcf86cd799439013',
          user: '507f1f77bcf86cd799439011',
          status: 'active',
          book: '507f1f77bcf86cd799439012'
        })
      );
      const returnedTx = {
        _id: '507f1f77bcf86cd799439013',
        status: 'returned',
        returnDate: new Date(),
        book: '507f1f77bcf86cd799439012'
      };
      Transaction.findOneAndUpdate.mockResolvedValue(returnedTx);
      Transaction.findOneAndUpdate.returned = returnedTx;
      Book.findByIdAndUpdate.mockResolvedValue({});

      const res = await request(app)
        .patch('/api/transactions/507f1f77bcf86cd799439013/return')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('returned');
    });

    test('debe devolver 409 si ya fue devuelto', async () => {
      Transaction.updateMany.mockResolvedValue({ modifiedCount: 0 });
      Transaction.findById.mockReturnValue(createMockQuery({ status: 'returned' }));
      const res = await request(app)
        .patch('/api/transactions/507f1f77bcf86cd799439013/return')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(409);
    });

    test('debe devolver 404 si el préstamo no existe', async () => {
      Transaction.updateMany.mockResolvedValue({ modifiedCount: 0 });
      Transaction.findById.mockReturnValue(createMockQuery(null));
      const res = await request(app)
        .patch('/api/transactions/000000000000000000000000/return')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(404);
    });
  });
});
