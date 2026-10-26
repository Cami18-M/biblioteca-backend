const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de usuario bajo /api/users

/**
 * POST /api/users - Crear un nuevo usuario
 */
router.post('/', userController.createUser);

/**
 * GET /api/users - Obtener todos los usuarios
 */
router.get('/', userController.getAllUsers);

/**
 * GET /api/users/:id - Obtener un usuario por ID
 */
router.get('/:id', userController.getUserById);

/**
 * GET /api/users/email/:email - Obtener un usuario por email
 */
router.get('/email/:email', userController.getUserByEmail);

/**
 * PUT /api/users/:id - Actualizar un usuario por ID
 */
router.put('/:id', userController.updateUser);

/**
 * DELETE /api/users/:id - Eliminar un usuario por ID
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;