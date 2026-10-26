jest.mock('../../src/models/userModel', () => require('../mocks/userModel'));

const { createMockQuery } = require('../mocks/queryHelper');
const request = require('supertest');
const app = require('../../src/app');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/userModel');

const userData = {
  name: 'Usuario Test',
  email: 'test@example.com',
  password: 'Password123'
};

describe('Integration - authRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    test('debe registrar un usuario y devolver 201', async () => {
      User.findOne.mockReturnValue(createMockQuery(null));
      User.create.mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
        name: userData.name,
        email: userData.email,
        role: 'client',
        password: undefined
      });

      const res = await request(app).post('/api/auth/register').send(userData);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.email).toBe(userData.email);
    });

    test('debe devolver 400 si faltan campos', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Solo nombre' });
      expect(res.status).toBe(400);
    });

    test('debe devolver 409 si el email ya existe', async () => {
      User.findOne.mockReturnValue(createMockQuery({ email: userData.email }));
      const res = await request(app).post('/api/auth/register').send(userData);
      expect(res.status).toBe(409);
    });
  });

  describe('POST /api/auth/login', () => {
    test('debe iniciar sesión y devolver token JWT con 200', async () => {
      const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        email: userData.email,
        password: 'hashed_password',
        name: userData.name,
        role: 'client',
        comparePassword: jest.fn().mockResolvedValue(true)
      };
      User.findOne.mockReturnValue(createMockQuery(mockUser));

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: userData.email, password: userData.password });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
    });

    test('debe devolver 401 con credenciales inválidas', async () => {
      User.findOne.mockReturnValue(createMockQuery(null));
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: userData.email, password: 'WrongPassword123' });
      expect(res.status).toBe(401);
      expect(res.body.error).toBeDefined();
    });

    test('debe devolver 400 si faltan credenciales', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: userData.email });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/auth/me (protegido)', () => {
    let token;

    beforeEach(() => {
      token = jwt.sign(
        { id: '507f1f77bcf86cd799439011', email: userData.email, role: 'client' },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      User.findById.mockReturnValue(
        createMockQuery({
          _id: '507f1f77bcf86cd799439011',
          email: userData.email,
          name: userData.name
        })
      );
    });

    test('debe devolver el perfil con token válido (200)', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe(userData.email);
    });

    test('debe devolver 401 sin token', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test('debe devolver 401 con token inválido', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer token_invalido');
      expect(res.status).toBe(401);
    });
  });
});
