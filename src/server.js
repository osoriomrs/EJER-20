require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

let dbConnection;

const startServer = async () => {
  if (!dbConnection) {
    dbConnection = connectDB();
  }

  await dbConnection;

  return app;
};

if (require.main === module) {
  startServer()
    .then(() => {
      const server = app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
        console.log(`Abre la API en: http://localhost:${PORT}`);
      });

      server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
          console.error(`El puerto ${PORT} ya esta en uso.`);
          console.error(`Cierra el proceso que lo ocupa o cambia PORT en .env.`);
          process.exit(1);
        }

        throw error;
      });
    })
    .catch((error) => {
      console.error('No se pudo iniciar el servidor', error);
      process.exit(1);
    });
}

module.exports = async (req, res) => {
  await startServer();
  return app(req, res);
};
