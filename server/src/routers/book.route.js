import Router from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

// express router for book API
const router = Router();

// route for fetching all books and creating a new book
router.route("/").get(getBooks).post(createBook);

// route for fetching, updating, and deleting a book by ID
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

export default router;
