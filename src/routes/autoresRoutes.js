const express = require('express');
const {
  getAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor,
  getLibrosByAutor
} = require('../controllers/autoresController');

const router = express.Router();

router.route('/').get(getAutores).post(createAutor);
router.route('/:id').get(getAutorById).put(updateAutor).delete(deleteAutor);
router.get('/:id/libros', getLibrosByAutor);

module.exports = router;
