import React, { useEffect, useRef, useState,useContext } from 'react'
import axios from 'axios'
import displayPrice from '../helpers/displayCurrency'
import { Link } from 'react-router-dom';
import Context from '../context';
import AddToCart from '../helpers/AddToCart';

const CategoryWiseProductDisplay = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)
    
    const {fetchUserAddToCart} =useContext(Context)

    const handleAddToCart =async (e,id)=>{
       await  AddToCart(e,id)
        fetchUserAddToCart()
    }



    const fetchCategoryWiseProducts = async () => {
        setLoading(true)
        console.log("category", category);

        const res = await axios.post("http://localhost:3000/api/user/get-categoryproducts", { category })
        console.log(res)
        setData(res?.data?.data)
        setLoading(false)

    }
    useEffect(() => {
        fetchCategoryWiseProducts()
    }, [])

    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div  className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
              
                {
                    loading?(
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                        {/* <img className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' src={product.productImage[0]} alt="" /> */}
                                    </div>
                                    <div className='p-4 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 p-1 py-2 text-black animate-pulse rounded-full bg-slate-200 '></h2>
                                        <p className='capitalize text-slate-500 animate-pulse rounded-full p-1 bg-slate-200 w-full py-2'></p>
                                    <div className='flex gap-2'>
                                        <p className='text-red-600 font-medium animate-pulse rounded-full bg-slate-200 p-1 w-full py-2'></p>
                                        <p className='text-slate-500 line-through animate-pulse rounded-full bg-slate-200 p-1 w-full py-2'></p>
    
                                    </div>
                                    <button className=' text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse rounded-full'>
                                      
                                    </button>
                                    </div>
                                </div>
                            )
    
                        }
                    )
                    )
                    :
                    (
                        data.map((product, index) => {
                            return (
                                < Link to={'/product/'+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                        <img className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' src={product.productImage[0]} alt="" />
                                    </div>
                                    <div className='p-4 grid gap-2'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product.category}</p>
                                    <div className='flex gap-2'>
                                        <p className='text-red-600 font-medium'>{displayPrice(product.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayPrice(product.price)}</p>
    
                                    </div>
                                    <button  onClick={(e)=>handleAddToCart(e,product._id)} className=' text-sm bg-red-500 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'>
                                        Add To Cart
                                    </button>
                                    </div>
                                </Link>
                            )
    
                        }
                    )
                    )

                }

            </div>

        </div>
    )
}

export default CategoryWiseProductDisplay