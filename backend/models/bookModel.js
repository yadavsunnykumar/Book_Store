import mongoose from 'mongoose'

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true, //This means that the field is required to be filled in when creating a new document (book)
    },
    author: {
      type: String,
      required: true, //This means that the field is required to be filled in when creating a new document (book)
    },
    publishYear: {
      type: Number,
      required: true, //This means that the field is required to be filled in when creating a new document (book)
    },
  },
  {
    timestamps: true,
  }
)
export const Book = mongoose.model('Book', bookSchema)
