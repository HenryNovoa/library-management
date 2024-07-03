const mongoose = require('mongoose');
const Book = require('../../../domain/entities/Book');
const BookRepository = require('../../../domain/repositories/BookRepository');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    genre: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }
});

const BookModel = mongoose.model('Book', BookSchema);

class MongoBookRepository extends BookRepository {
    async findById(id) {
        const book = await BookModel.findById(id);
        return book ? new Book(book._id.toString(), book.title, book.author, book.publicationYear, book.genre, book.isAvailable) : null;
    }

    async create(bookData) {
        const newBook = new BookModel(bookData);
        await newBook.save();
        return new Book(newBook._id.toString(), newBook.title, newBook.author, newBook.publicationYear, newBook.genre, newBook.isAvailable);
    }

    async update(id, bookData) {
        const book = await BookModel.findByIdAndUpdate(id, bookData, { new: true });
        return book ? new Book(book._id.toString(), book.title, book.author, book.publicationYear, book.genre, book.isAvailable) : null;
    }
}

module.exports = MongoBookRepository;