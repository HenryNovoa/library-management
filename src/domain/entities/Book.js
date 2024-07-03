class Book {
    constructor(id, title, author, publicationYear, genre, isAvailable = true) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.genre = genre;
        this.isAvailable = isAvailable;
    }
}

module.exports = Book;