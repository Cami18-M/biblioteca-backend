const authService = require('../services/authService');

/**
 * Controlador de autenticación - Manejo de peticiones HTTP
 */

/**
 * POST /api/auth/register
 * Registra un nuevo usuario.
 */
const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Inicia sesión y devuelve un token JWT.
 */
const login = async (req, res, next) => {
  try {
    const { token, user } = await authService.login(req.body);

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        token,
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Devuelve el perfil del usuario autenticado (ruta protegida).
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { message: 'Usuario no encontrado' }
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile
};
