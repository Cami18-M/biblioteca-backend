const errorHandler = (err, req, res, next) => {
  // Determinar el código de estado HTTP
  let statusCode = err.statusCode || err.status || 500;

  // Determinar el mensaje de error
  let message = err.message || 'Error interno del servidor';

  // Traducir errores comunes de Mongoose a respuestas HTTP claras
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join('. ');
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Valor inválido para el campo ${err.path}`;
  }

  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {}).join(', ');
    message = field
      ? `Ya existe un registro con ese valor en el campo ${field}`
      : 'Ya existe un registro con esos datos';
  }

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
