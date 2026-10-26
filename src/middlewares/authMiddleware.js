const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación.
 * Verifica que la petición incluya un Bearer Token JWT válido
 * y adjunta los datos del usuario en req.user.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: { message: 'Acceso denegado. Token no proporcionado' }
    });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      success: false,
      error: { message: 'Formato de token inválido. Use: Bearer <token>' }
    });
  }

  if (!process.env.JWT_SECRET) {
    const error = new Error('JWT_SECRET no está configurado en las variables de entorno');
    error.statusCode = 500;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    const message =
      error.name === 'TokenExpiredError'
        ? 'Token expirado. Inicie sesión nuevamente'
        : 'Token inválido';

    return res.status(401).json({
      success: false,
      error: { message }
    });
  }
};

module.exports = authMiddleware;
