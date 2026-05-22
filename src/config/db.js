const dns = require('dns');
const mongoose = require('mongoose');

const connectDB = async () => {
  if (process.env.DNS_SERVERS) {
    dns.setServers(
      process.env.DNS_SERVERS
        .split(',')
        .map((server) => server.trim())
        .filter(Boolean)
    );
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('Falta la variable de entorno MONGODB_URI');
  }

  await mongoose.connect(mongoUri, {
    dbName: 'libreria'
  });

  console.log('Conectado a MongoDB Atlas');
};

module.exports = connectDB;
