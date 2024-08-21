import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const CategoryList = () => {

    const [category,setCategory]=useState([])
    const[loading,setLoading]=useState(false)
   const fetchCategoryProducts=async()=>{
    try{

        const data= await axios.get("http://localhost:3000/api/user/get-category-singleproduct")
        console.log(data.data.data);
        setCategory(data.data.data)
        setLoading(false)
    }
    catch(error)
    {
        console.log(error);
    }

   }
useEffect(()=>{
    fetchCategoryProducts()
},[])

  return (
    <div className='container mx-auto p-4'>
    <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>

    {
         loading ? (
            categoryLoading.map((el,index)=>{
                    return(
                        <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                        </div>
                    )
            })  
        ) :
       (
        category?.map((product,index)=>{
                    return(

                     <Link to={'/category-product/'+product.category} className='cursor-pointer'>
                         <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                             <img src={product?.productImage[0]} alt="category" className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                         </div>
                         <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                     </Link>
                    )

        })
    )
    }
            
    
    </div>
</div>
  )
}

export default CategoryList