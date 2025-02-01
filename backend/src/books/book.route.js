//book.route.js
const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, updateABook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

//get all books
router.get('/', getAllBooks);
//get single book
router.get('/:id', getSingleBook);
//Post a Book
router.post('/create-book', verifyAdminToken, postABook);
//Update a Book
router.put('/edit/:id', verifyAdminToken, updateABook);
//Delete a Book
router.delete('/:id', verifyAdminToken, deleteABook);

module.exports = router;