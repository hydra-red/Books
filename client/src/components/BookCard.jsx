import { LuClipboardPen } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router";

function BookCard({ book }) {
  const navigate = useNavigate();

  function handleDelete(e) {
    e.preventDefault();
    navigate(`/book/delete/${book._id}`);
  }

  function handleEdit(e) {
    e.preventDefault();
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

        <button className="btn btn-ghost btn-error" onClick={handleDelete}>
          <RiDeleteBinLine className="size-4" />
        </button>
      </div>
    </Link>
  );
}

export default BookCard;
