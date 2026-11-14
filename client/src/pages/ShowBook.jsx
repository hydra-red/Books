import { useEffect, useState } from "react";
import BackButton from "../components/BackButton.jsx";
import { useParams, Link } from "react-router";
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
          toast.error("Erro getting data from server");
          console.log("Error fetching data", error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, []);

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
                <Link to={`/book/delete/${book._id}`}>
                <button className="btn btn-error">
                  <RiDeleteBinLine className="size-3 md:size-6" />
                </button>
                </Link>
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
