const Autor = require('../models/Autor');
const Libro = require('../models/Libro');

const getAutores = async (req, res, next) => {
  try {
    const filtro = {};

    if (req.query.nacionalidad) {
      filtro.nacionalidad = req.query.nacionalidad;
    }

    const autores = await Autor.find(filtro).sort({ nombre: 1 });
    res.json(autores);
  } catch (error) {
    next(error);
  }
};

const getAutorById = async (req, res, next) => {
  try {
    const autor = await Autor.findOne({ referencia: req.params.id });

    if (!autor) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }

    res.json(autor);
  } catch (error) {
    next(error);
  }
};

const createAutor = async (req, res, next) => {
  try {
    const autor = await Autor.create(req.body);
    res.status(201).json(autor);
  } catch (error) {
    next(error);
  }
};

const updateAutor = async (req, res, next) => {
  try {
    const autor = await Autor.findOneAndUpdate(
      { referencia: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!autor) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }

    res.json(autor);
  } catch (error) {
    next(error);
  }
};

const deleteAutor = async (req, res, next) => {
  try {
    const autor = await Autor.findOneAndDelete({ referencia: req.params.id });

    if (!autor) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }

    await Libro.deleteMany({ autor: req.params.id });
    res.json({ mensaje: 'Autor y sus libros eliminados correctamente' });
  } catch (error) {
    next(error);
  }
};

const getLibrosByAutor = async (req, res, next) => {
  try {
    const autor = await Autor.findOne({ referencia: req.params.id });

    if (!autor) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }

    const libros = await Libro.find({ autor: req.params.id }).sort({ titulo: 1 });
    res.json(libros);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor,
  getLibrosByAutor
};
