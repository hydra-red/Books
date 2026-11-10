import mongoose from 'mongoose';

// mongoDB schema for book model
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publishYear:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
})

// create a model for book schema
const Book = mongoose.model("Book",bookSchema);

export default Book;