jest.mock('../../src/models/userModel', () => require('../mocks/userModel'));

const { createMockQuery } = require('../mocks/queryHelper');
const userService = require('../../src/services/userService');
const User = require('../../src/models/userModel');

const userData = {
  name: 'Usuario Test',
  email: 'test@example.com',
  password: 'Password123'
};

describe('Unit - userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    test('debe crear un usuario', async () => {
      const created = { ...userData, _id: '507f1f77bcf86cd799439011', save: jest.fn().mockResolvedValue({ ...userData, _id: '507f1f77bcf86cd799439011' }) };
      User.create.mockResolvedValue(created);
      const user = await userService.createUser(userData);
      expect(user).toHaveProperty('_id');
      expect(user.email).toBe(userData.email);
    });
  });

  describe('getAllUsers', () => {
    test('debe devolver lista vacía inicialmente', async () => {
      User.find.mockReturnValue(createMockQuery([]));
      const users = await userService.getAllUsers();
      expect(users).toEqual([]);
    });

    test('debe devolver los usuarios creados', async () => {
      const u1 = { _id: '1', email: 'a@test.com', password: undefined };
      const u2 = { _id: '2', email: 'b@test.com', password: undefined };
      User.find.mockReturnValue(createMockQuery([u1, u2]));
      const users = await userService.getAllUsers();
      expect(users.length).toBe(2);
      users.forEach((u) => expect(u.password).toBeUndefined());
    });
  });

  describe('getUserById', () => {
    test('debe devolver el usuario por ID válido', async () => {
      const found = { _id: '507f1f77bcf86cd799439011', email: userData.email, password: undefined };
      User.findById.mockReturnValue(createMockQuery(found));
      const result = await userService.getUserById('507f1f77bcf86cd799439011');
      expect(result.email).toBe(userData.email);
    });

    test('debe devolver null si no existe', async () => {
      User.findById.mockReturnValue(createMockQuery(null));
      const found = await userService.getUserById('000000000000000000000000');
      expect(found).toBeNull();
    });
  });

  describe('getUserByEmail', () => {
    test('debe devolver el usuario por email existente', async () => {
      const found = { _id: '507f1f77bcf86cd799439011', email: userData.email, password: undefined };
      User.findOne.mockReturnValue(createMockQuery(found));
      const result = await userService.getUserByEmail(userData.email);
      expect(result.email).toBe(userData.email);
    });

    test('debe devolver null si el email no existe', async () => {
      User.findOne.mockReturnValue(createMockQuery(null));
      const found = await userService.getUserByEmail('noexiste@example.com');
      expect(found).toBeNull();
    });
  });

  describe('updateUser', () => {
    test('debe actualizar un usuario existente', async () => {
      const updated = { _id: '507f1f77bcf86cd799439011', name: 'Nombre Actualizado', email: userData.email, password: undefined };
      User.findByIdAndUpdate.mockReturnValue(createMockQuery(updated));
      const result = await userService.updateUser('507f1f77bcf86cd799439011', { name: 'Nombre Actualizado' });
      expect(result.name).toBe('Nombre Actualizado');
    });

    test('debe devolver null si no existe', async () => {
      User.findByIdAndUpdate.mockReturnValue(createMockQuery(null));
      const updated = await userService.updateUser('000000000000000000000000', { name: 'X' });
      expect(updated).toBeNull();
    });
  });

  describe('deleteUser', () => {
    test('debe eliminar un usuario existente', async () => {
      const deleted = { _id: '507f1f77bcf86cd799439011', email: userData.email };
      User.findByIdAndDelete.mockResolvedValue(deleted);
      const result = await userService.deleteUser('507f1f77bcf86cd799439011');
      expect(result).toBeTruthy();
    });

    test('debe devolver null si no existe', async () => {
      User.findByIdAndDelete.mockResolvedValue(null);
      const deleted = await userService.deleteUser('000000000000000000000000');
      expect(deleted).toBeNull();
    });
  });
});
