import { LuClipboardPen } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router";
import axiosInstance from "../lib/axios.js";
import { toast } from "react-hot-toast";
import BookModal from "./Home/BookModal.jsx";
import { CgEye } from "react-icons/cg";
import { useState } from "react";

function BookCard({ book, setBook }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  async function handleDelete(e, id) {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this Book")) return;

    try {
      const respone = await axiosInstance.delete(`/books/${id}`);
      toast.success("Successfully Deleted the book");
      setBook((prev) => prev.filter((book) => book._id !== id));
    } catch (error) {
      console.log("Error while deleteing the Book", error);
      toast.error("Something went wrong while deleting Book");
    }
  }

  function handleEdit(e, id) {
    e.preventDefault();
    navigate(`/book/edit/${id}`);
  }

  function showModalFunc(e){
    e.preventDefault();
    setShowModal(true)
  }
  return (
    <>
    <Link
      to={`/book/details/${book._id}`}
      className="bg-base-content/20 border-2 border-primary rounded-3xl p-3 px-5"
    >
      <h3 className="text-primary font-bold text-xl my-3">{book.title}</h3>
      <p className="text-primary/80">{book.author}</p>
      <p className="text-primary/80">{book.publishYear}</p>
      <div className="flex justify-end mt-5">
        <button
          onClick={(e) => showModalFunc(e)}
          className="btn btn-ghost btn-primary"
        >
          <CgEye />
        </button>
        <button
          className="btn btn-ghost"
          onClick={(e) => handleEdit(e, book._id)}
        >
          <LuClipboardPen className="size-4" />
        </button>

        <button
          className="btn btn-ghost btn-error"
          onClick={(e) => handleDelete(e, book._id)}
        >
          <RiDeleteBinLine className="size-4" />
        </button>
      </div>
    </Link>
      {showModal && <BookModal book={book} onClose={()=>setShowModal(false)}/>}
    </>
  );
}

export default BookCard;
