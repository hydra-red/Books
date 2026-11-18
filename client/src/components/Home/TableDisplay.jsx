import { LuClipboardPen } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axiosInstance from "../../lib/axios.js";

const TableDisplay = ({ books, setBook }) => {
  const navigate = useNavigate();

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this Book")) return;

    try {
      const respone = await axiosInstance.delete(`/books/${id}`);
      toast.success("Successfully Deleted the book");
      setBook((prev) => prev.filter((book) => book._id !== id));
    } catch (error) {
      toast.error("Something went wrong while deleting Book");
      console.log("Error while deleteing the Book", error);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl overflow-x-auto rounded-2xl bg-base-content/20">
      <table className="table w-full min-w-[720px] table-fixed">
        <thead>
          <tr className="text-center">
            <th className="w-[10%]">S.no.</th>
            <th className="w-[25%]">Book Title</th>
            <th className="w-[23%]">Author</th>
            <th className="w-[22%]">Publishing Year</th>
            <th className="w-[20%]">Options</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr className="text-center" key={book._id}>
              <td
                className="cursor-pointer whitespace-normal break-words"
                onClick={() => navigate(`book/details/${book._id}`)}
              >
                {index + 1}
              </td>

              <td
                className="cursor-pointer whitespace-normal break-words"
                onClick={() => navigate(`book/details/${book._id}`)}
              >
                {book.title}
              </td>
              <td
                className="cursor-pointer whitespace-normal break-words"
                onClick={() => navigate(`book/details/${book._id}`)}
              >
                {book.author}
              </td>
              <td
                className="cursor-pointer whitespace-normal break-words"
                onClick={() => navigate(`book/details/${book._id}`)}
              >
                {book.publishYear}
              </td>
              <td className="whitespace-nowrap">
                <Link to={`/book/edit/${book._id}`}>
                  <button className="btn btn-ghost">
                    <LuClipboardPen className="size-4" />
                  </button>
                </Link>
                <button
                  className="btn btn-ghost btn-error"
                  onClick={() => handleDelete(book._id)}
                >
                  <RiDeleteBinLine className="size-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDisplay;
