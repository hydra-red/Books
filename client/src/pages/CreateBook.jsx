import { useState } from "react";
import BackButton from "../components/BackButton.jsx";
import RateLimit from "../components/RateLimit.jsx";
import axiosInstance from "../lib/axios.js";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateLimit, setRateLimit] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      return toast.error("Empty feild.");
    }
    setLoading(true);
    try {
      const book = { title, author, publishYear: Number(publishYear) };
      const response = await axiosInstance.post("/books", book);
      console.log(response.data.data);
      toast.success("successfully created a book");
      navigate("/");
    } catch (error) {
      if (error.status == 429) {
        setRateLimit(true);
        console.log("Rate limit reached", error.message);
      } else {
        toast.error("Something went Wrong while creating note");
        console.log("Error while creating note", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto my-10 ">
      {rateLimit ? (
        <RateLimit />
      ) : (
        <div>
          <h1 className="text-center text-primary text-3xl font-bold">
            Create a New Book
          </h1>
          <div className="border-2 border-primary p-4 mt-5 rounded-2xl hover:shadow-xl">
            <BackButton />
            <form
              className=" my-5 p-5 flex flex-col justify-center items-center"
              onSubmit={handleSubmit}
            >
              <div className="from-control flex flex-col justify-between gap-3 w-full">
                <label htmlFor="title">
                  <span>Title:</span>
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className="input min-w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="from-control flex flex-col justify-between gap-3 w-full mt-4">
                <label htmlFor="author">
                  <span>Author:</span>
                </label>
                <input
                  type="text"
                  id="author"
                  className="input min-w-full"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="from-control flex flex-col justify-between gap-3 w-full mt-4">
                <label htmlFor="publishYear">
                  <span>Publish Year:</span>
                </label>
                <input
                  type="number"
                  id="publishYear"
                  step="1"
                  required
                  className="input min-w-full"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                />
              </div>
              <button className="mt-6 btn btn-primary" disabled={loading}>
                {loading ? "Submiting" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
