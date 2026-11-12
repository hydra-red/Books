import { Link } from "react-router"

function EmptyData(){
 return (
 <div className="w-full flex justify-center items-center">
    <div className="max-w-2xl border-t-2 border-primary  py-10 px-20 bg-base-content/10 flex justify-center items-center flex-col gap-5 rounded-3xl shadow-xl">
    <h2 className="text-primary font-bold text-xl md:text-3xl m-1">No Books Found</h2>
    <p className="text-primary/60 font">Please Create New Books</p>
    <Link to={"/book/create"} className="btn btn-primary">
    <span>Create Book</span>
    </Link>
    </div>
 </div>)
}

export default EmptyData