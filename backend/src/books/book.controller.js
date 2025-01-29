const Book = require("./book.model");

const postABook = async(req, res) =>{
    try{
        const newBook = await Book({...req.body})
        await newBook.save()
        res.status(200).send({message: 'Book posted Successfully', book: newBook})
    }
    catch(error){
        console.error("Error creating Book");
        res.status(500).send({message: 'Failed to create book'})
    }
}

const getAllBooks = async(req,res) =>{
    try{
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send(books)
    }
    catch(err){
        res.status(500).send('Error finding Books: Internal Server Error ' + err);
    }
}

const getSingleBook = async(req,res) =>{
    try{
        const {id} = req.params
        const singleBook = await Book.findById(id)
        if(!singleBook){
            res.status(404).send({message: "Book not Found"})
        }
        res.status(200).send(singleBook)
    }
    catch(err){
        res.status(500).send('Error finding Book: Internal Server Error ' + err);
    }
}

const updateABook = async(req,res) => {
    try{
        const {id} = req.params
        const updateBook = await Book.findByIdAndUpdate(id, req.body, {new: true})
        if(!updateBook){
            res.status(404).send({message: "Book not Found"})
        }
        res.status(200).send({
            message: "Book Updated Successfully",
            book: updateBook
        })
    }
    catch(err){
        res.status(500).send('Error Updating a Book: Internal Server Error ' + err);
    }
}

const deleteABook = async(req,res) => {
    try{
        const {id} = req.params
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook){
            res.status(404).send({message: "Book not Found"})
        }
        res.status(200).send({
            message: "Book Deleted Successfully",
            book: deletedBook
        })
    }
    catch(err){
        res.status(500).send('Error Deleting a Book: Internal Server Error ' + err);
    }
}

module.exports ={
    postABook,
    getAllBooks,
    getSingleBook,
    updateABook,
    deleteABook
}