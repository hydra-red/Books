import { Link } from "react-router";
import { GoArrowLeft } from "react-icons/go";


function BackButton(){
    return(
        <button className="p-2 btn btn-ghost">
        <Link to={"/"} className="flex justify-center items-center p-2">
        <GoArrowLeft className=" size-4 md:size-5" /> 
        <span className="px-2">Back to Home</span>
        </Link>
        </button>
    )
}

export default BackButton