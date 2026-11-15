import { useEffect, useState } from "react";
import BackButton from "../components/BackButton.jsx";
import { useParams, Link, useNavigate } from "react-router";
import axiosInstance from "../lib/axios.js";
import { LuClipboardPen } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import RateLimit from "../components/RateLimit.jsx";
import toast from "react-hot-toast";
import Header from "../components/Header.jsx";
import Spinner from "../components/Spinner.jsx";
import { formateDate } from "../lib/dateFormater.js";

export default function ShowBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [rateLimit, setRateLimit] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/books/${id}`);
        setBook(response.data.data);
      } catch (error) {
        if (error.status == 429) {
          setRateLimit(true);
          console.log("Rate Limit error");
        } else {
          toast.error("Error getting data from server");
          console.log("Error fetching data", error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, []);

  async function handleDelete(e, id) {
    e.preventDefault();
    // navigate(`/book/delete/${book._id}`);
    if (!window.confirm("Are you sure you want to delete this Book")) return;

    try {
      const respone = await axiosInstance.delete(`/books/${book._id}`);
      toast.success("Successfully Deleted the book");
      setBook((prev) => prev.filter((book) => book._id !== id));
      navigate("/")
    } catch (error) {
      console.log("Error while deleteing the Book", error);
      toast.error("Something went wrong while deleting Book");
    }
  }

  return (
    <div className="">
      {!loading && rateLimit && <RateLimit />}
      {loading && (
        <div className="w-full min-h-screen flex justify-center items-center flex-col">
          <Spinner />
        </div>
      )}

      {!loading && !rateLimit && (
        <div>
          <Header />
          <div className="max-w-3xl mx-auto md:py-5 rounded-3xl md:mt-10 md:px-2">
            <div className="flex justify-around md:justify-between items-center">
              <BackButton />
              <div className="flex md:gap-3">
                <Link to={`/book/edit/${book._id}`}>
                  <button className="btn btn-ghost btn-primary">
                    <LuClipboardPen className=" size-3 md:size-6" />
                  </button>
                </Link>
                <button
                  className="btn btn-error"
                  onClick={(e) => handleDelete(e, book._id)}
                >
                  <RiDeleteBinLine className="size-3 md:size-6" />
                </button>
              </div>
            </div>
            <div className="w-full mt-5 border-t-2 rounded-4xl hover:shadow-xl border-primary text-center py-5">
              <h2 className="text-3xl my-5 font-bold text-primary">
                {book.title}
              </h2>
              <p className="text-primary/80 my-3 ">{book.author}</p>
              <p className="text-primary/80 my-3 ">{book.publishYear}</p>
              <p className="text-primary/80 my-3 ">ID: {book._id}</p>
              <p className="text-primary/80 my-3 ">
                Created At: <span>{formateDate(new Date(book.createdAt))}</span>
              </p>
              <p className="text-primary/80 my-3 ">
                Updated At: <span>{formateDate(new Date(book.updatedAt))}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
