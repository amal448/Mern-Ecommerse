import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import axios from 'axios'
import AdminProductCard from '../components/AdminProductCard'

function AllProducts() {
  const [uploadProduct,setUploadProduct]=useState(false)
  const [allProduct,setallProduct]=useState([])

  const FetchProducts=async()=>{
    try{

    const data= await axios.get("http://localhost:3000/api/admin/all-Products", { withCredentials: true })
    console.log(data.data.data)
    setallProduct(data.data.data)
    }
    catch(error){
      console.log(error)
    }
  }

useEffect(()=>{
  FetchProducts();
},[])



  return (
    <div>
    <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setUploadProduct(true)}>Upload Product</button>
    </div>

    {/**all product */}
    <div className='flex items-center flex-wrap gap-5 py-4  overflow-y-scroll'>
     
    {
            allProduct.map((product,index)=>{
              return(
                <AdminProductCard data={product} key={index+"allProduct"} fetchdata={FetchProducts} />
                
              )
            })
          }
      
    </div>





    {/**upload prouct component */}
    {
      uploadProduct &&(
        <UploadProduct onClose={()=>{
          setUploadProduct(false)
        }} fetchdata={FetchProducts}/>

      )
    }
  

</div>
  )
}

export default AllProducts