const express = require('express');
const BookController = require('../../../interfaces/controllers/BookController');
const BookUseCase = require('../../../application/use-cases/books');
const MongoBookRepository = require('../../persistence/mongodb/MongoBookRepository');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const bookRepository = new MongoBookRepository();
const bookUseCase = new BookUseCase(bookRepository);
const bookController = new BookController(bookUseCase);

router.get('/:id', bookController.getBook.bind(bookController));
router.get('/:id/availability', bookController.checkAvailability.bind(bookController));
router.post('/', authMiddleware, bookController.createBook.bind(bookController));
router.put('/:id', authMiddleware, bookController.updateBook.bind(bookController));

module.exports = router;