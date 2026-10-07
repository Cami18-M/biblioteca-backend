const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// ============================================
// RUTAS DE PRUEBA PARA MANEJO DE ERRORES
// ============================================

/**
 * Ruta que lanza un error a PROPÓSITO para probar el middleware de errores
 * Accede a: GET http://localhost:5000/test-error
 */
app.get('/test-error', (req, res, next) => {
  // ERROR INTENCIONAL - Esto es una prueba deliberada
  throw new Error('Prueba de error intencional desde /test-error');
});

/**
 * Ruta que lanza un error con status code personalizado
 * Accede a: GET http://localhost:5000/test-error-400
 */
app.get('/test-error-400', (req, res, next) => {
  const error = new Error('Error de validación (simulado)');
  error.statusCode = 400; // Código de estado personalizado
  throw error;
});

// ============================================
// MANEJO DE RUTAS NO ENCONTRADAS (404)
// ============================================
// Este middleware captura TODAS las rutas no definidas y lanza un error
// para que sea manejado por nuestro errorMiddleware (respuesta JSON)
app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error); // Pasa el error al middleware de manejo de errores
});

// ============================================
// MIDDLEWARE DE MANEJO DE ERRORES (ÚLTIMO)
// ============================================
app.use(errorHandler);

module.exports = app;
