const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas públicas de autenticación bajo /api/auth

/**
 * POST /api/auth/register - Registrar un nuevo usuario
 */
router.post('/register', authController.register);

/**
 * POST /api/auth/login - Iniciar sesión y obtener token JWT
 */
router.post('/login', authController.login);

// Ruta protegida de ejemplo: requiere Bearer Token válido
/**
 * GET /api/auth/me - Perfil del usuario autenticado
 */
router.get('/me', authMiddleware, authController.getProfile);

module.exports = router;
