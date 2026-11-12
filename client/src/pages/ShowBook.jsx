import { useEffect, useState } from "react";
import BackButton from "../components/BackButton.jsx";
import { useParams } from "react-router";
import axiosInstance from "../lib/axios.js";

export default function ShowBook() {

    const [book,setBook] = useState({})
    const [loading,setLoading] = useState(false)
    const {id} = useParams();

    useEffect(()=>{
        const fetchBook = async() =>{
            const response = await axiosInstance.get(`/books/${id}`)
            console.log(response.data.data)
        }
        fetchBook()
    },[])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 border-2 border-primary">
        <div className="max-w-2xl mx-auto"></div>
        
        <BackButton />

        <div>
        </div>
      </div>
    </div>
  );
}
