const express = require('express');
const {
  getLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro
} = require('../controllers/librosController');

const router = express.Router();

router.route('/').get(getLibros).post(createLibro);
router.route('/:id').get(getLibroById).put(updateLibro).delete(deleteLibro);

module.exports = router;
