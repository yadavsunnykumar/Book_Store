import express from 'express'
import { Book } from '../models/bookModel.js'

const router = express.Router()

// Routes for Save a new book
router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: 'Send all required fields: title,author,publishYear' })
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    }
    const book = await Book.create(newBook)
    return res.status(201).send(book)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Route to get all book from database

router.get('/', async (req, res) => {
  try {
    const books = await Book.find({})
    return res.status(200).json({
      count: books.length,
      data: books,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})
//Route to get one book from database by id

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const book = await Book.findById(id)
    return res.status(200).json({
      count: book.length,
      data: book,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Route to update books
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: 'Send all required fields: title,author,publishYear' })
    }
    const { id } = req.params
    const result = await Book.findByIdAndUpdate(id, req.body)
    if (!result) {
      return res.status(404).json({
        message: 'Book not found to update.',
      })
    } else {
      return res.status(200).send({ message: 'Book updated Successfully' })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
})
//Route for Delete a book

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await Book.findByIdAndDelete(id)
    if (!result) {
      return res.status(404).json({
        message: 'Book  not Found to delete',
      })
    } else {
      return res.status(200).json({
        message: 'Book Deleted successfully',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: `Error deleting the book ${error}` })
  }
})

export default router
