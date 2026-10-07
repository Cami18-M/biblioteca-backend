const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Conexión a MongoDB Atlas exitosa');
};

module.exports = connectDB;
