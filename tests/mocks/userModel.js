const { createMockQuery } = require('./queryHelper');

const _id = () => '507f1f77bcf86cd79943901' + Math.floor(Math.random() * 10).toString();

function UserMock(data = {}) {
  Object.assign(this, {
    _id: data._id || _id(),
    name: data.name || 'Usuario Test',
    email: data.email || 'test@example.com',
    password: data.password || 'hashed_password',
    role: data.role || 'client',
    createdAt: new Date(),
    updatedAt: new Date(),
    save: jest.fn().mockResolvedValue(this),
    comparePassword: jest.fn().mockResolvedValue(true),
    toJSON: jest.fn().mockReturnValue({
      _id: this._id.toString(),
      name: this.name,
      email: this.email,
      role: this.role
    })
  });
  return this;
}

UserMock.findOne = jest.fn();
UserMock.create = jest.fn(async (data) => new UserMock(data));
UserMock.findById = jest.fn();
UserMock.find = jest.fn();
UserMock.findByIdAndUpdate = jest.fn().mockReturnValue(createMockQuery(null));
UserMock.findByIdAndDelete = jest.fn();

// toJSON seguro: _id siempre tiene valor
const originalToJSON = UserMock.prototype.toJSON;
UserMock.prototype.toJSON = function () {
  const safeId = this._id ? this._id.toString() : String(this._id || _id());
  return {
    _id: safeId,
    name: this.name,
    email: this.email,
    role: this.role
  };
};
UserMock.exists = jest.fn();

module.exports = UserMock;
