// Configuración de variables de entorno para tests (sin base de datos real, usa mocks)
process.env.MONGODB_URI = 'mongodb://localhost:27017/biblioteca_test';
process.env.JWT_SECRET = 'test_jwt_secret_do_not_use_in_production';
process.env.JWT_EXPIRES_IN = '1d';
process.env.LOAN_PERIOD_DAYS = '14';
process.env.NODE_ENV = 'test';
process.env.PORT = '5001';
process.env.BCRYPT_SALT_ROUNDS = '10';
