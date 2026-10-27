jest.mock('../../src/models/userModel', () => require('../mocks/userModel'));

const { createMockQuery } = require('../mocks/queryHelper');
const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/userModel');

const userData = {
  name: 'Usuario Test',
  email: 'test@example.com',
  password: 'Password123'
};

describe('Integration - userRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/users', () => {
    test('debe crear un usuario (201)', async () => {
      User.create.mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
        name: 'Nuevo Usuario',
        email: 'nuevo@example.com',
        password: undefined
      });

      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Nuevo Usuario', email: 'nuevo@example.com', password: 'NuevaPass123' });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
    });

    test('debe devolver 400 si faltan campos obligatorios', async () => {
      const res = await request(app).post('/api/users').send({ name: 'X' });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/users', () => {
    test('debe listar usuarios (200)', async () => {
      User.find.mockReturnValue(createMockQuery([]));
      const res = await request(app).get('/api/users');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/users/:id', () => {
    test('debe devolver usuario por ID válido (200)', async () => {
      User.findById.mockReturnValue(
        createMockQuery({
          _id: '507f1f77bcf86cd799439011',
          email: 'buscarme@example.com',
          password: undefined
        })
      );
      const res = await request(app).get('/api/users/507f1f77bcf86cd799439011');
      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe('buscarme@example.com');
    });

    test('debe devolver 404 si el usuario no existe', async () => {
      User.findById.mockReturnValue(createMockQuery(null));
      const res = await request(app).get('/api/users/000000000000000000000000');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/users/email/:email', () => {
    test('debe devolver usuario por email existente (200)', async () => {
      User.findOne.mockReturnValue(
        createMockQuery({
          _id: '507f1f77bcf86cd799439011',
          email: 'emailtest@example.com',
          password: undefined
        })
      );
      const res = await request(app).get('/api/users/email/emailtest@example.com');
      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe('emailtest@example.com');
    });

    test('debe devolver 404 si el email no existe', async () => {
      User.findOne.mockReturnValue(createMockQuery(null));
      const res = await request(app).get('/api/users/email/noexiste@example.com');
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/users/:id', () => {
    test('debe actualizar un usuario (200)', async () => {
      User.findByIdAndUpdate.mockReturnValue(
        createMockQuery({
          _id: '507f1f77bcf86cd799439011',
          name: 'Actualizado',
          email: 'antiguo@example.com',
          password: undefined
        })
      );
      const res = await request(app)
        .put('/api/users/507f1f77bcf86cd799439011')
        .send({ name: 'Actualizado' });
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('Actualizado');
    });

    test('devolver 404 si no existe', async () => {
      User.findByIdAndUpdate.mockReturnValue(
        createMockQuery(null)
      );
      const res = await request(app)
        .put('/api/users/000000000000000000000000')
        .send({ name: 'X' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/users/:id', () => {
    test('debe eliminar un usuario (200)', async () => {
      User.findByIdAndDelete.mockResolvedValue({ _id: '507f1f77bcf86cd799439011' });
      const res = await request(app).delete('/api/users/507f1f77bcf86cd799439011');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test('debe devolver 404 si no existe', async () => {
      User.findByIdAndDelete.mockResolvedValue(null);
      const res = await request(app).delete('/api/users/000000000000000000000000');
      expect(res.status).toBe(404);
    });
  });
});
