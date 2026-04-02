const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  issued: {
    type: Boolean,
    default: false,
  },
  id: {
   type: mongoose.Schema.Types.ObjectId
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;