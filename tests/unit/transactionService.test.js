jest.mock('../../src/models/userModel', () => require('../mocks/userModel'));
jest.mock('../../src/models/bookModel', () => require('../mocks/bookModel'));
jest.mock('../../src/models/transactionModel', () => require('../mocks/transactionModel'));

const { createMockQuery } = require('../mocks/queryHelper');
const transactionService = require('../../src/services/transactionService');
const userService = require('../../src/services/userService');
const bookService = require('../../src/services/bookService');
const User = require('../../src/models/userModel');
const Book = require('../../src/models/bookModel');
const Transaction = require('../../src/models/transactionModel');

const userData = {
  name: 'Usuario Test',
  email: 'test@example.com',
  password: 'Password123'
};

const bookData = {
  title: 'Código Limpio',
  author: 'Robert C. Martin',
  isbn: '978-0132350884',
  publishedYear: 2008,
  stock: 2,
  category: 'Programación'
};

describe('Unit - transactionService', () => {
  let user, book;

  beforeEach(() => {
    jest.clearAllMocks();
    user = { _id: '507f1f77bcf86cd799439011', ...userData, password: undefined };
    book = { _id: '507f1f77bcf86cd799439012', ...bookData, stock: 2 };
  });

  describe('createTransaction', () => {
    test('debe crear un préstamo y descontar stock', async () => {
      User.findById.mockResolvedValue(user);
      Book.findOneAndUpdate.mockResolvedValue({ ...book, stock: 1 });
      Transaction.create.mockResolvedValue({
        _id: '507f1f77bcf86cd799439013',
        status: 'active',
        dueDate: new Date(),
        populate: jest.fn().mockResolvedValue({ _id: '507f1f77bcf86cd799439013', status: 'active' })
      });

      const tx = await transactionService.createTransaction({
        userId: user._id.toString(),
        bookId: book._id.toString()
      });
      expect(tx).toHaveProperty('_id');
      expect(tx.status).toBe('active');
    });

    test('debe calcular dueDate usando LOAN_PERIOD_DAYS (14 días por defecto)', async () => {
      User.findById.mockResolvedValue(user);
      Book.findOneAndUpdate.mockResolvedValue({ ...book, stock: 1 });
      const future = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
      const mockTx = {
        _id: '507f1f77bcf86cd799439013',
        status: 'active',
        borrowDate: new Date(),
        dueDate: future,
        populate: jest.fn().mockResolvedValue({})
      };
      mockTx.populate = jest.fn().mockResolvedValue(mockTx);
      Transaction.create.mockResolvedValue(mockTx);

      const tx = await transactionService.createTransaction({
        userId: user._id.toString(),
        bookId: book._id.toString()
      });
      const borrow = new Date(tx.borrowDate);
      const due = new Date(tx.dueDate);
      const diffDays = (due - borrow) / (1000 * 60 * 60 * 24);
      expect(Math.round(diffDays)).toBe(14);
    });

    test('debe rechazar si falta userId o bookId', async () => {
      await expect(
        transactionService.createTransaction({ bookId: book._id.toString() })
      ).rejects.toThrow('El usuario y el libro son obligatorios');
    });

    test('debe rechazar usuario no encontrado', async () => {
      User.findById.mockResolvedValue(null);
      await expect(
        transactionService.createTransaction({
          userId: '000000000000000000000000',
          bookId: book._id.toString()
        })
      ).rejects.toThrow('Usuario no encontrado');
    });

    test('debe rechazar libro no encontrado', async () => {
      User.findById.mockResolvedValue(user);
      Book.findOneAndUpdate.mockResolvedValue(null);
      Book.exists.mockResolvedValue(false);
      await expect(
        transactionService.createTransaction({
          userId: user._id.toString(),
          bookId: '000000000000000000000000'
        })
      ).rejects.toThrow('Libro no encontrado');
    });

    test('debe rechazar sin stock disponible', async () => {
      User.findById.mockResolvedValue(user);
      Book.findOneAndUpdate.mockResolvedValue(null);
      Book.exists.mockResolvedValue(true);
      await expect(
        transactionService.createTransaction({
          userId: user._id.toString(),
          bookId: book._id.toString()
        })
      ).rejects.toThrow('No hay ejemplares disponibles de este libro');
    });
  });

  describe('returnBook', () => {
    test('debe devolver un préstamo activo y restaurar stock', async () => {
      Transaction.updateMany.mockResolvedValue({ modifiedCount: 0 });
      const mockTx = {
        _id: '507f1f77bcf86cd799439013',
        user: user._id,
        status: 'active',
        returnDate: null,
        book: book._id,
        save: jest.fn().mockResolvedValue({}),
        populate: jest.fn().mockResolvedValue({ status: 'returned', returnDate: new Date() })
      };
      Transaction.findById.mockResolvedValue(mockTx);
      Transaction.findOneAndUpdate.mockResolvedValue(mockTx);
      Book.findByIdAndUpdate.mockResolvedValue({});

      const returned = await transactionService.returnBook(mockTx._id.toString(), {
        userId: user._id.toString(),
        role: 'client'
      });
      expect(returned.status).toBe('returned');
    });

    test('debe rechazar devolver préstamo ya devuelto', async () => {
      const mockTx = { _id: '507f1f77bcf86cd799439013', status: 'returned' };
      Transaction.findById.mockResolvedValue(mockTx);
      await expect(
        transactionService.returnBook(mockTx._id.toString(), {
          userId: user._id.toString(),
          role: 'client'
        })
      ).rejects.toThrow('Este préstamo ya fue devuelto');
    });

    test('debe rechazar préstamo no encontrado', async () => {
      Transaction.findById.mockResolvedValue(null);
      await expect(
        transactionService.returnBook('000000000000000000000000', {
          userId: user._id.toString(),
          role: 'client'
        })
      ).rejects.toThrow('Préstamo no encontrado');
    });
  });

  describe('getAllTransactions', () => {
    test('debe listar transacciones', async () => {
      Transaction.updateMany.mockResolvedValue({ modifiedCount: 0 });
      Transaction.find.mockReturnValue(createMockQuery([]));
      const txs = await transactionService.getAllTransactions({});
      expect(txs).toEqual([]);
    });
  });

  describe('markOverdueTransactions', () => {
    test('debe marcar como overdue préstamos vencidos', async () => {
      Transaction.updateMany.mockResolvedValue({ modifiedCount: 1 });
      const count = await transactionService.markOverdueTransactions();
      expect(count).toBe(1);
    });
  });
});
