const mongoose = require('mongoose');

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Modelo de libro del catálogo.
 * `stock` representa los ejemplares DISPONIBLES para préstamo:
 * disminuye al registrar un préstamo y aumenta al registrar una devolución.
 */
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
    isbn: {
      type: String,
      required: [true, 'El ISBN del libro es obligatorio'],
      unique: true,
      trim: true,
      maxlength: [20, 'El ISBN no puede superar los 20 caracteres']
    },
    publishedYear: {
      type: Number,
      required: [true, 'El año de publicación es obligatorio'],
      min: [1000, 'El año de publicación debe ser mayor o igual a 1000'],
      max: [CURRENT_YEAR, `El año de publicación no puede ser posterior a ${CURRENT_YEAR}`]
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      default: 0,
      min: [0, 'El stock no puede ser negativo'],
      validate: {
        validator: Number.isInteger,
        message: 'El stock debe ser un número entero'
      }
    },
    category: {
      type: String,
      required: [true, 'La categoría del libro es obligatoria'],
      trim: true,
      minlength: [2, 'La categoría debe tener al menos 2 caracteres'],
      maxlength: [60, 'La categoría no puede superar los 60 caracteres']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Índices para las búsquedas más comunes del catálogo
bookSchema.index({ title: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ category: 1 });

/**
 * Indica si el libro tiene ejemplares disponibles para prestar.
 */
bookSchema.virtual('available').get(function () {
  return this.stock > 0;
});

module.exports = mongoose.model('Book', bookSchema);
