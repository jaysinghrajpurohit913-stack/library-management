const BookModel = require('../models/book.models');


const addbook = async function(req,res){
    try {
        const { title, author, publishedYear, price, issued } = req.body;
        const book = await BookModel.create({ title, author, publishedYear, price, issued });
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBooks = async function(req,res){
    try {
        const books = await BookModel.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatebook = async function(req,res){
    try {
        const id = req.params.id;
        const book  = await BookModel.findByIdAndUpdate({
            _id:id
        },{
            issued:req.body.issued
        }
        ,{ 
        new: true 
        });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({
            book:book,
            message:"Book issued successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const deletebook = async function(req,res){
    try {
        const id = req.params.id;
        const book  = await BookModel.findByIdAndDelete({
            _id:id
        });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({
            book:book,
            message:"Book deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}   

module.exports = { addbook, getBooks, updatebook, deletebook };