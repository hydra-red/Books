import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Spinner from "../components/Spinner.jsx";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios.js";
import EmptyData from "../components/EmptyData.jsx";
import CardDisplay from "../components/Home/CardDisplay.jsx";
import TableDisplay from "../components/Home/TableDisplay.jsx";
import RateLimit from "../components/RateLimit.jsx";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rateLimit, setRateLimit] = useState(false);
  const [displayType, setDisplaytype] = useState("card");

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/books");
        setBooks(response.data.data);
      } catch (error) {
        if (error.status === 429) {
          setRateLimit(true);
          console.log("Rate limit reached", error.message);
        } else {
          toast.error("Error getting Data from  server");
          console.log("Error fetching data", error.message, error.status);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  return (
    <div>
      {!rateLimit && !loading && (
        <div>
          <Header />
          <div className="w-2xs mx-auto mt-3">
            <div className="w-full flex justify-evenly items-center">
              <button
                className="btn btn-primary"
                onClick={() => setDisplaytype("card")}
              >
                Card
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setDisplaytype("table")}
              >
                Table
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="w-full flex justify-center items-center flex-col">
            <Spinner />
            <span>Loading data...</span>
          </div>
        )}

        {rateLimit && !loading && <RateLimit />}

        {books.length == 0 && !rateLimit && !loading ? (
          <EmptyData />
        ) : displayType === "card" ? (
          <CardDisplay books={books} setBooks={setBooks} />
        ) : (
          <TableDisplay books={books} setBook={setBooks} />
        )}
      </div>
    </div>
  );
}

export default Home;
