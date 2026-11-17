import { LuClipboardPen } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axiosInstance from "../../lib/axios.js";
import { CgEye } from "react-icons/cg";

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

  function handleEdit() {}
  return (
    <div className="w--4xl mx-auto bg-base-content/20 rounded-2xl">
      <table className="flex justify-center items-center flex-col gap-2">
        <thead className="w-full text-center flex justify-center">
          <tr className="flex gap-50 p-4">
            <th>S.no.</th>
            <th>Book Title</th>
            <th>Author</th>
            <th>Publishing Year</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody className="text-center w-full flex justify-center">
          {books.map((book, index) => (
            <tr className="flex gap-50 p-4" key={book._id}>
              <td
                className="hover:cursor-pointer"
                onClick={() => navigate(`book/details/${book._id}`)}
              >
                {index + 1}
              </td>
              <td
                className="hover:cursor-pointer"
                onClick={() => navigate(`book/details/${book._id}`)}
              >
                {book.title}
              </td>
              <td
                className="hover:cursor-pointer"
                onClick={() => navigate(`book/details/${book._id}`)}
              >
                {book.author}
              </td>
              <td
                className="hover:cursor-pointer"
                onClick={() => navigate(`book/details/${book._id}`)}
              >
                {book.publishYear}
              </td>
              <td>
                <button className="btn btn-ghost btn-primary">
                  <CgEye />
                </button>
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
