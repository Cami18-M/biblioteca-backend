const mongoose = require('mongoose');
const { createMockQuery } = require('./queryHelper');

const ObjectId = mongoose.Types.ObjectId;

const _id = () => new ObjectId();

function BookMock(data = {}) {
  Object.assign(this, {
    _id: data._id || _id(),
    title: data.title || 'Libro Test',
    author: data.author || 'Autor Test',
    isbn: data.isbn || '978-0000000000',
    publishedYear: data.publishedYear || 2020,
    stock: data.stock ?? 1,
    category: data.category || 'Test',
    createdAt: new Date(),
    updatedAt: new Date(),
    save: jest.fn().mockResolvedValue(this),
    toJSON: jest.fn().mockReturnValue({
      _id: this._id.toString(),
      title: this.title,
      author: this.author,
      isbn: this.isbn,
      publishedYear: this.publishedYear,
      stock: this.stock,
      category: this.category
    })
  });
  return this;
}

BookMock.findOne = jest.fn();
BookMock.findOneAndUpdate = jest.fn();
BookMock.create = jest.fn(async (data) => new BookMock(data));
BookMock.findById = jest.fn();
BookMock.find = jest.fn();
BookMock.findByIdAndUpdate = jest.fn();
BookMock.findByIdAndDelete = jest.fn();
BookMock.exists = jest.fn();
BookMock.countDocuments = jest.fn().mockResolvedValue(0);

module.exports = BookMock;
