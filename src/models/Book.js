const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título del libro es obligatorio'],
      trim: true,
      minlength: [1, 'El título debe tener al menos 1 carácter'],
      maxlength: [200, 'El título no puede superar los 200 caracteres']
    },
    author: {
      type: String,
      required: [true, 'El autor del libro es obligatorio'],
      trim: true,
      minlength: [1, 'El autor debe tener al menos 1 carácter'],
      maxlength: [100, 'El autor no puede superar los 100 caracteres']
    },
    year: {
      type: Number,
      required: [true, 'El año de publicación es obligatorio'],
      min: [1000, 'El año debe ser mayor o igual a 1000'],
      max: [new Date().getFullYear(), 'El año no puede ser futuro']
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Book', bookSchema);
