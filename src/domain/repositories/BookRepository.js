class BookRepository {
    async findById(id) {
        throw new Error('Method findById must be implemented');
    }

    async create(bookData) {
        throw new Error('Method create must be implemented');
    }

    async update(id, bookData) {
        throw new Error('Method update must be implemented');
    }

    async checkAvailability(id) {
        throw new Error('Method checkAvailability must be implemented');
    }

    async findAll() {
        throw new Error('Method findAll must be implemented');
    }
}

module.exports = BookRepository;