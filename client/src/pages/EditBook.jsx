import { useEffect, useState } from "react";
import BackButton from "../components/BackButton.jsx";
import RateLimit from "../components/RateLimit.jsx";
import axiosInstance from "../lib/axios.js";
import { useNavigate, useParams } from "react-router";
import Spinner from "../components/Spinner.jsx";
import { toast } from "react-hot-toast";

export default function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [saving, setSaving] = useState(false);
  const [rateLimit, setRateLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function fetchBook() {
      try {
        const response = await axiosInstance.get(`/books/${id}`);
        const book = response.data.data;
        setTitle(book.title);
        setAuthor(book.author);
        setPublishYear(book.publishYear);
      } catch (error) {
        toast.error("Something went wrong while getting the book");
        console.log("Error fetching book from server", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      return toast.error("Empty feild.");
    }
    setSaving(true);
    try {
      const book = { title, author, publishYear: Number(publishYear) };
      const response = await axiosInstance.put(`/books/${id}`, book);
      console.log(response.data.data);
      toast.success("Successfully changed a book");
      navigate("/");
    } catch (error) {
      if (error.status == 429) {
        setRateLimit(true);
        console.log("Rate limit reached", error.message);
      } else {
        toast.error("Something went Wrong while Editing a Book");
        console.log("Error while changing the book", error.message);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto my-10">
      {loading && <div className="w-full mx-auto flex justify-center items-center"><Spinner /></div>}
      {!loading && rateLimit && <RateLimit />}
      {!rateLimit && !loading && (
        <div>
          <h1 className="text-center text-primary text-3xl font-bold">
            Edit Book
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
              <button className="mt-6 btn btn-primary" disabled={saving}>
                {saving ? "Saving" : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
