const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');

const booksController = require('../controllers/books');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);

router.post('/', validate.saveBook, booksController.create);
router.put('/:id', validate.saveBook, booksController.update);
router.delete('/:id', booksController.deleteOne);

module.exports = router;