const Autor = require('../models/Autor');
const Libro = require('../models/Libro');

const getLibros = async (req, res, next) => {
  try {
    const orden = {};

    if (req.query.sort === 'titulo') {
      orden.titulo = 1;
    }

    const libros = await Libro.find().sort(orden);
    res.json(libros);
  } catch (error) {
    next(error);
  }
};

const getLibroById = async (req, res, next) => {
  try {
    const libro = await Libro.findOne({ referencia: req.params.id });

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    res.json(libro);
  } catch (error) {
    next(error);
  }
};

const createLibro = async (req, res, next) => {
  try {
    const autor = await Autor.findOne({ referencia: req.body.autor });

    if (!autor) {
      return res.status(400).json({ mensaje: 'El autor indicado no existe' });
    }

    const libro = await Libro.create(req.body);
    res.status(201).json(libro);
  } catch (error) {
    next(error);
  }
};

const updateLibro = async (req, res, next) => {
  try {
    if (req.body.autor) {
      const autor = await Autor.findOne({ referencia: req.body.autor });

      if (!autor) {
        return res.status(400).json({ mensaje: 'El autor indicado no existe' });
      }
    }

    const libro = await Libro.findOneAndUpdate(
      { referencia: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    res.json(libro);
  } catch (error) {
    next(error);
  }
};

const deleteLibro = async (req, res, next) => {
  try {
    const libro = await Libro.findOneAndDelete({ referencia: req.params.id });

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    res.json({ mensaje: 'Libro eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro
};
