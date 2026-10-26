const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Servicios de autenticación - Lógica de negocio

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

/**
 * Crea un error con código HTTP para que lo maneje errorMiddleware.
 */
const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/**
 * Obtiene el secreto JWT y falla de forma segura si no está configurado.
 */
const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw createError('JWT_SECRET no está configurado en las variables de entorno', 500);
  }
  return process.env.JWT_SECRET;
};

/**
 * Genera un token JWT firmado para un usuario.
 * @param {Object} user - Documento de usuario
 * @returns {String} Token JWT
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role
    },
    getJwtSecret(),
    { expiresIn: JWT_EXPIRES_IN }
  );
};

/**
 * Registra un nuevo usuario. La contraseña se encripta en el hook pre-save del modelo.
 * @param {Object} userData - Datos del usuario (name, email, password)
 * @returns {Promise<Object>} Usuario creado (sin contraseña)
 */
const register = async ({ name, email, password } = {}) => {
  if (!name || !email || !password) {
    throw createError('El nombre, correo electrónico y contraseña son obligatorios', 400);
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw createError('Ya existe un usuario registrado con ese correo electrónico', 409);
  }

  try {
    // El rol siempre se asigna como 'client' en el registro público,
    // evitando que un usuario se auto-asigne privilegios de administrador.
    return await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: 'client'
    });
  } catch (error) {
    if (error.code === 11000) {
      throw createError('Ya existe un usuario registrado con ese correo electrónico', 409);
    }
    throw error;
  }
};

/**
 * Valida las credenciales de un usuario y genera su token JWT.
 * @param {Object} credentials - Credenciales (email, password)
 * @returns {Promise<Object>} Token JWT y datos del usuario
 */
const login = async ({ email, password } = {}) => {
  if (!email || !password) {
    throw createError('El correo electrónico y la contraseña son obligatorios', 400);
  }

  // select('+password') porque el campo está oculto por defecto
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

  // Mensaje genérico para no revelar si el correo existe
  if (!user) {
    throw createError('Credenciales inválidas', 401);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw createError('Credenciales inválidas', 401);
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

/**
 * Obtiene el perfil del usuario autenticado.
 * @param {String} id - ID del usuario
 * @returns {Promise<Object|null>} Usuario encontrado o null
 */
const getProfile = async (id) => {
  return await User.findById(id);
};

module.exports = {
  register,
  login,
  getProfile,
  generateToken
};
