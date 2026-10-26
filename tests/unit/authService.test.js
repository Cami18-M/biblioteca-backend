jest.mock('../../src/models/userModel', () => require('../mocks/userModel'));

const { createMockQuery } = require('../mocks/queryHelper');
const authService = require('../../src/services/authService');
const User = require('../../src/models/userModel');

const userData = {
  name: 'Usuario Test',
  email: 'test@example.com',
  password: 'Password123'
};

describe('Unit - authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    test('debe registrar un nuevo usuario exitosamente', async () => {
      const createdUser = { ...userData, _id: '507f1f77bcf86cd799439011', role: 'client', password: undefined };
      User.create.mockResolvedValue(createdUser);
      User.findOne.mockResolvedValue(null);

      const user = await authService.register(userData);
      expect(user).toHaveProperty('_id');
      expect(user.email).toBe('test@example.com');
      expect(User.create).toHaveBeenCalled();
    });

    test('debe rechazar campos faltantes', async () => {
      await expect(authService.register({ name: 'Solo nombre' })).rejects.toThrow(
        'El nombre, correo electrónico y contraseña son obligatorios'
      );
    });

    test('debe rechazar email duplicado', async () => {
      User.findOne.mockResolvedValue({ email: userData.email });
      await expect(authService.register(userData)).rejects.toThrow(
        'Ya existe un usuario registrado con ese correo electrónico'
      );
    });

    test('debe normalizar el email a minúsculas', async () => {
      const createdUser = { email: 'test@example.com', _id: '507f1f77bcf86cd799439011', role: 'client' };
      User.create.mockResolvedValue(createdUser);
      User.findOne.mockResolvedValue(null);

      await authService.register({ ...userData, email: 'TEST@Example.COM' });
      expect(User.create).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'test@example.com' })
      );
    });
  });

  describe('login', () => {
    beforeEach(() => {
      User.findOne.mockResolvedValue(null);
    });

    test('debe iniciar sesión con credenciales válidas y devolver token', async () => {
      const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        email: userData.email,
        password: 'hashed',
        name: 'Usuario Test',
        role: 'client',
        comparePassword: jest.fn().mockResolvedValue(true),
        toJSON: jest.fn().mockReturnValue({ _id: '507f1f77bcf86cd799439011', name: 'Usuario Test', email: userData.email, role: 'client' })
      };
      User.findOne.mockReturnValue(createMockQuery(mockUser));

      const result = await authService.login({
        email: userData.email,
        password: userData.password
      });
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(userData.email);
    });

    test('debe rechazar credenciales inválidas (usuario no existe)', async () => {
      User.findOne.mockReturnValue(createMockQuery(null));
      await expect(
        authService.login({ email: 'noexiste@example.com', password: 'Password123' })
      ).rejects.toThrow('Credenciales inválidas');
    });

    test('debe rechazar contraseña incorrecta', async () => {
      const mockUser = {
        email: userData.email,
        password: 'hashed',
        comparePassword: jest.fn().mockResolvedValue(false)
      };
      User.findOne.mockReturnValue(createMockQuery(mockUser));

      await expect(
        authService.login({ email: userData.email, password: 'WrongPassword123' })
      ).rejects.toThrow('Credenciales inválidas');
    });

    test('debe rechazar campos faltantes', async () => {
      await expect(authService.login({ email: userData.email })).rejects.toThrow(
        'El correo electrónico y la contraseña son obligatorios'
      );
    });
  });

  describe('generateToken', () => {
    test('debe generar un JWT válido con id, email y role', async () => {
      const user = { _id: '507f1f77bcf86cd799439011', email: 'test@example.com', role: 'client' };
      const token = authService.generateToken(user);
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });
  });

  describe('getProfile', () => {
    test('debe obtener el perfil de un usuario existente', async () => {
      const mockUser = { _id: '507f1f77bcf86cd799439011', email: userData.email };
      User.findById.mockReturnValue(createMockQuery(mockUser));

      const profile = await authService.getProfile('507f1f77bcf86cd799439011');
      expect(profile.email).toBe(userData.email);
    });

    test('debe devolver null si el usuario no existe', async () => {
      User.findById.mockReturnValue(createMockQuery(null));
      const profile = await authService.getProfile('000000000000000000000000');
      expect(profile).toBeNull();
    });
  });
});
