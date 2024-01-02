import express from 'express'
import mongoose from 'mongoose'

import { PORT, mongoDBURL } from './config.js'
import { Book } from './models/bookModel.js'
import booksRoutes from './routes/booksRoutes.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
  console.log(request)
  response.status(200).send('<h1>Welcome to mern stack</h1>')
})

app.use('/books', booksRoutes)
// Middleware for handling CORS Policy
// app.use(
//   cors({
//     origin: ['http://localhost:5173/'],
//     // credentials:true,
//     methods: ['GET', 'PUT', 'POST', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// )

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App is connected to database')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
