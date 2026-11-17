import BookCard from "../BookCard.jsx";

const CardDisplay = ({books,setBooks}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book._id} book={book} setBook={setBooks} />
      ))}
    </div>
  );
};

export default CardDisplay;
