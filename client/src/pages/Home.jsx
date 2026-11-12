import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Spinner from "../components/Spinner.jsx";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios.js";
import EmptyData from "../components/EmptyData.jsx";
import BookCard from "../components/BookCard.jsx";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/books");
        setBooks(response.data.data);
      } catch (error) {
        toast.error("Error getting Data from  server");
        console.log("Error fetching data", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="w-full flex justify-center items-center flex-col">
            <Spinner />
            <span>Loading data...</span>
          </div>
        )}

        {books.length == 0 && !loading && <EmptyData />}

        {books.length>0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book)=>(
              <BookCard key={book._id} book={book} setBook={setBooks}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
