const express = require('express');
const router = express.Router();
const { addbook,getBooks ,updatebook,deletebook } = require('../controller/book.controller');


router.post('/books',addbook);
router.get('/books',getBooks);
router.patch('/books/:id',updatebook);
router.delete('/books/:id',deletebook);

module.exports = router;