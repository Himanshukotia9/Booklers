//book.route.js
const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, updateABook, deleteABook } = require('./book.controller');
const router = express.Router();

//get all books
router.get('/', getAllBooks)
//get single book
router.get('/:id', getSingleBook)
//Post a Book
router.post('/create-book', postABook)
//Update a Book
router.put('/edit/:id', updateABook)
//Delete a Book
router.delete('/:id', deleteABook)

module.exports = router;