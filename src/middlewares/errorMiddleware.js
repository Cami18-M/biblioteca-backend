/**
 * Middleware de manejo de errores para Express
 * Debe tener 4 parámetros: (err, req, res, next)
 */
const errorHandler = (err, req, res, next) => {
  // Determinar el código de estado HTTP
  const statusCode = err.statusCode || err.status || 500;

  // Determinar el mensaje de error
  const message = err.message || 'Error interno del servidor';

  // En desarrollo, incluir el stack trace para depuración
  const response = {
    error: {
      message: message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  };

  // Log del error en consola (en producción podrías usar un logger como Winston)
  console.error(`[${new Date().toISOString()}] Error ${statusCode}:`, message);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;