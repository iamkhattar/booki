const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    reviews: [
        {
            message: {
                type: String,
            },
            rating: {
                type: Number,
            }
        },
    ],
});

module.exports = Book = mongoose.model("book", BookSchema);
