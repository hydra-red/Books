import {Routes,Route} from "react-router"
import Home from "./pages/Home.jsx"
import CreateBook from "./pages/CreateBook.jsx"
import DeleteBook from "./pages/DeleteBook copy.jsx"
import EditBook from "./pages/EditBook.jsx"
import ShowBook from "./pages/ShowBook.jsx"

function App() {

  return (
    <div className="min-h-full min-w-full">
    <Routes> 
      <Route path="/" element={<Home />}/>
      <Route path="/book/create" element={<CreateBook />}/>
      <Route path="/book/delete/:id" element={<DeleteBook />}/>
      <Route path="/book/edit/:id" element={<EditBook />}/>
      <Route path="/book/details/:id" element={<ShowBook />}/>
    </Routes>
    </div>
  )
}

export default App
