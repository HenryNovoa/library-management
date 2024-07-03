class BookUseCase {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async getBook(id) {
        return this.bookRepository.findById(id);
    }

    async checkAvailability(id) {
        const book = await this.bookRepository.findById(id);
        return book ? book.isAvailable : false;
    }

    async createBook(bookData) {
        return this.bookRepository.create(bookData);
    }

    async updateBook(id, bookData) {
        return this.bookRepository.update(id, bookData);
    }
}

module.exports = BookUseCase;