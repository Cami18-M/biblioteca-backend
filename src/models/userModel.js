const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del usuario es obligatorio'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [100, 'El nombre no puede superar los 100 caracteres']
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'El correo electrónico no es válido']
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
      // La contraseña no se devuelve por defecto en las consultas
      select: false
    },
    role: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client'
    }
  },
  {
    timestamps: true
  }
);

/**
 * Encripta la contraseña antes de guardar un usuario nuevo o cuando cambia.
 */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(SALT_ROUNDS));
});

/**
 * Encripta la contraseña cuando se actualiza mediante findOneAndUpdate/updateOne.
 */
userSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate() || {};
  const newPassword = update.password || (update.$set && update.$set.password);

  if (!newPassword) {
    return;
  }

  const hashedPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt(SALT_ROUNDS));

  if (update.password) {
    update.password = hashedPassword;
  }
  if (update.$set && update.$set.password) {
    update.$set.password = hashedPassword;
  }

  this.setUpdate(update);
});

/**
 * Compara una contraseña en texto plano con el hash almacenado.
 * @param {String} candidatePassword - Contraseña ingresada por el usuario
 * @returns {Promise<Boolean>} true si coincide
 */
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Elimina la contraseña de cualquier representación JSON del usuario.
 */
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);
