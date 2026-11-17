import { CgClose } from "react-icons/cg";

const BookModal = ({book,onClose}) => {
  return (
    <div className="fixed bg-black bg-opacity-60 top-0 left-0 bottom-0 right-0 z-50 flex justify-center items-center" onClick={onClose}><div onClick={(e)=>e.stopPropagation()}>
        </div>Hello world</div>
  )
}

export default BookModal