import { LuClipboardPen } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router";

function BookCard({ book }) {
  return (
    <Link
      to={`/book/details/${book._id}`}
      className="bg-base-content/20 border-2 border-primary rounded-3xl p-3 px-5"
    >
      <h3 className="text-primary font-bold text-xl my-3">{book.title}</h3>
      <p className="text-primary/80">{book.author}</p>
      <p className="text-primary/80">{book.publishYear}</p>
      <div className="flex justify-end mt-5">
        <Link to={`/book/edit/${book._id}`}>
          <button className="btn btn-ghost">
            <LuClipboardPen className="size-4" />
          </button>
        </Link>
        <Link to={`/book/delete/${book._id}`}>
        <button className="btn btn-ghost btn-error" onClick>
          <RiDeleteBinLine className="size-4" />
        </button>
        </Link>
      </div>
    </Link>
  );
}

export default BookCard;
