import Book from "../models/book.model.js";

// controller function for fetching all books
async function getBooks(req, res) {
  try {
    const books = await Book.find();

    if (!books) {
      console.log("Error in fetching Books");
    }

    res.status(200).json({
      count: books.length,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.log("Error while fetching books", error.message);
    res.status(500).json({ message: "Error fetching Books" });
  }
}

// controller function for fetching a book by ID
async function getBookById(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      console.log("Error in fetching Book");
    }

    res.status(200).json({ message: "Book fetched successfully", data: book });
  } catch (error) {
    console.log("Error while fetching Book", error.message);
    res.status(500).json({ message: "Error fetching Book" });
  }
}

// controller function for creating a new book
async function createBook(req, res) {
  try {
    const { title, author, publishYear } = req.body;

    if ([title, author].some((field) => field.trim() === "")) {
      res.status(400).json({ message: "Empty field" });
      return;
    }

    if (!Number.isInteger(publishYear) || publishYear < 0) {
      console.log("Invalid Publish Year");
      return res.status(400).json({ message: "Invalid publish year" }
        
      );
    }

    const book = await Book.create({ title, author, publishYear });

    if (!book) {
      console.log("Error in creating book");
    }

    res.status(200).json({ message: "Book Created successfully", data: book });
  } catch (error) {
    console.log("Error while creating Book", error.message);
    res.status(500).json({ message: "Error creating a Book" });
  }
}

// controller function for updating a book by ID
async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;

    if ([title, author].some((field) => field.trim() === "")) {
      return res.status(400).json({ message: "Empty fields" });
    }

    if (!Number.isInteger(publishYear) || publishYear < 0) {
      return res.status(400).json({ message: "Invalid publish year" });
    }

    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { returnDocument: "after" },
    ); //new:true to return the updated document

    if (!book) {
      console.log("Error in updating book");
    }

    res.status(200).json({ message: "Book Updated Successfully", data: book });
  } catch (error) {
    console.log("Error while updating Book", error.message);
    res.status(500).json({ message: "Error updating a Book" });
  }
}

// controller function for deleting a book by ID
async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      console.log("Error in deleting book");
    }

    res.status(200).json({ message: "Book Deleted Successfully", data: book });
  } catch (error) {
    console.log("Error while deleting Book", error.message);
    res.status(500).json({ message: "Error deleting Book" });
  }
}

export { createBook, getBooks, getBookById, updateBook, deleteBook };
