const { createMockQuery } = require('./queryHelper');

const _id = () => '507f1f77bcf86cd79943901' + Math.floor(Math.random() * 10).toString();

function TransactionMock(data = {}) {
  Object.assign(this, {
    _id: data._id || _id(),
    user: data.user || { _id: _id() },
    book: data.book || _id(),
    borrowDate: data.borrowDate || new Date(),
    dueDate: data.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    returnDate: data.returnDate || null,
    status: data.status || 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    save: jest.fn().mockResolvedValue(this),
    populate: jest.fn().mockResolvedValue(this),
    toJSON: jest.fn().mockReturnValue({
      _id: this._id.toString(),
      user: this.user._id || this.user,
      book: this.book.toString(),
      borrowDate: this.borrowDate,
      dueDate: this.dueDate,
      returnDate: this.returnDate,
      status: this.status
    })
  });
  return this;
}

TransactionMock.findOne = jest.fn();
TransactionMock.findOneAndUpdate = jest.fn().mockReturnValue(createMockQuery(null));
TransactionMock.create = jest.fn(async (data) => new TransactionMock(data));
TransactionMock.findById = jest.fn();
TransactionMock.find = jest.fn();
TransactionMock.findByIdAndDelete = jest.fn();
TransactionMock.exists = jest.fn();
TransactionMock.countDocuments = jest.fn().mockResolvedValue(0);
TransactionMock.updateMany = jest.fn().mockResolvedValue({ modifiedCount: 0 });

module.exports = TransactionMock;
