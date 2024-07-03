class BookController {
    constructor(bookUseCase) {
        this.bookUseCase = bookUseCase;
    }

    async getBook(req, res) {
        try {
            const book = await this.bookUseCase.getBook(req.params.id);
            res.json(book);
        } catch (error) {
            res.status(404).send('Book not found');
        }
    }

    async checkAvailability(req, res) {
        try {
            const availability = await this.bookUseCase.checkAvailability(req.params.id);
            res.json(availability);
        } catch (error) {
            res.status(500).send('Error checking availability');
        }
    }

}

module.exports = BookController;