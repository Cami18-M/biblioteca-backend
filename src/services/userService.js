const User = require('../models/userModel');

/**
 * Crea un error con código HTTP para que lo maneje errorMiddleware.
 */
const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Servicios de usuario - Lógica de negocio

/**
 * Crear un nuevo usuario
 * @param {Object} userData - Datos del usuario (name, email, password)
 * @returns {Promise<Object>} Usuario creado
 */
const createUser = async (userData) => {
  if (!userData.name || !userData.email || !userData.password) {
    throw createError('El nombre, correo electrónico y contraseña son obligatorios', 400);
  }
  
  const user = new User(userData);
  return await user.save();
};

/**
 * Obtener todos los usuarios
 * @returns {Promise<Array>} Lista de usuarios
 */
const getAllUsers = async () => {
  return await User.find().select('-password');
};

/**
 * Obtener un usuario por ID
 * @param {String} id - ID del usuario
 * @returns {Promise<Object|null>} Usuario encontrado o null
 */
const getUserById = async (id) => {
  return await User.findById(id).select('-password');
};

/**
 * Obtener un usuario por email
 * @param {String} email - Email del usuario
 * @returns {Promise<Object|null>} Usuario encontrado o null
 */
const getUserByEmail = async (email) => {
  return await User.findOne({ email }).select('-password');
};

/**
 * Actualizar un usuario por ID
 * @param {String} id - ID del usuario
 * @param {Object} updateData - Datos a actualizar
 * @returns {Promise<Object|null>} Usuario actualizado o null
 */
const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
};

/**
 * Eliminar un usuario por ID
 * @param {String} id - ID del usuario
 * @returns {Promise<Object|null>} Usuario eliminado o null
 */
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser
};