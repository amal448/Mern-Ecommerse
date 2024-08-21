import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
const SearchProduct = () => {

  const query=useLocation()
  console.log("query",query)

  const fetchProduct=async()=>{
    try{
      console.log("start");
      const data= await axios.get("http://localhost:3000/api/user/search"+ query.search, { withCredentials: true })
      console.log(data);

    }
    catch(error)
    {
      console.log(error);
      
    }
    
  }

  useEffect(()=>{
    fetchProduct()
  },[query])
  return (
    <div>SearchProduct</div>
  )
}

export default SearchProduct