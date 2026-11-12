import { Link } from "react-router";
import { GrAdd } from "react-icons/gr";


function Header() {
  return (
    <header className="w-full bg-base-300 border-b border-base-content/10 flex items-center justify-center">
      <div className="w-6xl flex justify-between items-center p-4 m-2">
        <h1 className="text-primary text-2xl md:text-4xl font-bold ">Books</h1>
        <div>
          <Link to={"/book/create"} className="btn btn-primary">
            <GrAdd className="size-3 md:size-5"/>
            <span>Create</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
