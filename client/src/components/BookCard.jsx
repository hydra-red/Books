import { LuClipboardPen } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router";
import axiosInstance from "../lib/axios.js";
import { toast } from "react-hot-toast";

function BookCard({ book, setBook }) {
  const navigate = useNavigate();

  async function handleDelete(e, id) {
    e.stopPropagation();
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

  function handleEdit(e) {
    e.stopPropagation();
    navigate(`/book/edit/${book._id}`);
  }

  return (
    <Link
      to={`/book/details/${book._id}`}
      className="bg-base-content/20 border-2 border-primary rounded-3xl p-3 px-5"
    >
      <h3 className="text-primary font-bold text-xl my-3">{book.title}</h3>
      <p className="text-primary/80">{book.author}</p>
      <p className="text-primary/80">{book.publishYear}</p>
      <div className="flex justify-end mt-5">
        <button className="btn btn-ghost" onClick={handleEdit}>
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
  );
}

export default BookCard;
