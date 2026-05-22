const cors = require('cors');
const express = require('express');

const autoresRoutes = require('./routes/autoresRoutes');
const librosRoutes = require('./routes/librosRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>API REST Biblioteca</title>
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            font-family: Arial, sans-serif;
            color: #1f2933;
            background: #f4f7f8;
          }

          main {
            width: min(92vw, 560px);
            padding: 32px;
            border: 1px solid #d9e2e7;
            border-radius: 8px;
            background: #ffffff;
            box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
          }

          h1 {
            margin: 0 0 8px;
            font-size: 28px;
          }

          p {
            margin: 0 0 24px;
            color: #52606d;
            line-height: 1.5;
          }

          .actions {
            display: grid;
            gap: 12px;
          }

          a {
            display: block;
            padding: 14px 16px;
            border: 1px solid #bcccdc;
            border-radius: 6px;
            color: #102a43;
            text-align: center;
            text-decoration: none;
            font-weight: 700;
            background: #f8fafc;
          }

          a:hover {
            border-color: #0f609b;
            color: #0f609b;
            background: #eef8ff;
          }
        </style>
      </head>
      <body>
        <main>
          <h1>API REST Biblioteca</h1>
          <p>Elige una coleccion para ver los datos disponibles.</p>
          <div class="actions">
            <a href="/api/autores">Ver autores</a>
            <a href="/api/libros">Ver libros</a>
          </div>
        </main>
      </body>
    </html>
  `);
});

app.use('/api/autores', autoresRoutes);
app.use('/api/libros', librosRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

app.use((error, req, res, next) => {
  if (error.code === 11000) {
    return res.status(409).json({
      mensaje: 'Ya existe un documento con esa referencia'
    });
  }

  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({
      mensaje: error.message
    });
  }

  console.error(error);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

module.exports = app;
