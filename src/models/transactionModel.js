const mongoose = require('mongoose');

const TRANSACTION_STATUSES = ['active', 'returned', 'overdue'];

/**
 * Modelo de transacción (préstamo) de un libro a un usuario.
 * Estados:
 * - active:   préstamo vigente, aún no devuelto
 * - returned: préstamo devuelto
 * - overdue:  préstamo vigente cuya fecha de vencimiento ya pasó
 */
const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El usuario es obligatorio']
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'El libro es obligatorio']
    },
    borrowDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    dueDate: {
      type: Date,
      required: [true, 'La fecha de vencimiento es obligatoria']
    },
    returnDate: {
      type: Date,
      default: null
    },
    status: {
      type: String,
      enum: {
        values: TRANSACTION_STATUSES,
        message: `El estado debe ser uno de: ${TRANSACTION_STATUSES.join(', ')}`
      },
      default: 'active'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Índices para consultas frecuentes (préstamos activos por usuario/libro)
transactionSchema.index({ user: 1, status: 1 });
transactionSchema.index({ book: 1, status: 1 });
transactionSchema.index({ status: 1, dueDate: 1 });

/**
 * La fecha de vencimiento no puede ser anterior a la fecha de préstamo.
 */
transactionSchema.path('dueDate').validate(function (value) {
  if (!value || !this.borrowDate) {
    return true;
  }
  return value > this.borrowDate;
}, 'La fecha de vencimiento debe ser posterior a la fecha de préstamo');

/**
 * Indica si el préstamo está vencido y sigue sin devolverse.
 */
transactionSchema.virtual('isOverdue').get(function () {
  return this.status !== 'returned' && this.dueDate < new Date();
});

module.exports = mongoose.model('Transaction', transactionSchema);
module.exports.TRANSACTION_STATUSES = TRANSACTION_STATUSES;
