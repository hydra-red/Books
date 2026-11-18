import { CgClose } from "react-icons/cg";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-gray-800/60 top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-150 max-w-full bg-white rounded-xl p-4 flex flex-col relative"
      >
        <CgClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h3 className="text-primary font-bold text-xl my-3">{book.title}</h3>
        <p className="text-primary/80">{book.author}</p>
        <p className="text-primary/80">{book.publishYear}</p>
        <div className="flex justify-end mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quam tenetur fugiat dignissimos pariatur quibusdam ipsa. Autem neque temporibus beatae saepe, tempore aliquid officia atque, porro, sunt laborum incidunt quam officiis.</div>
      </div>
    </div>
  );
};

export default BookModal;
