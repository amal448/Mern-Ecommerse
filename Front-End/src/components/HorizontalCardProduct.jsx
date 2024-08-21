import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import displayPrice from '../helpers/displayCurrency'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import AddToCart from '../helpers/AddToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)


    const [scroll,setScroll]=useState(0)
    const scrollElement=useRef()

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

    const scrollRight=()=>{
        console.log("dsd");
        scrollElement.current.scrollLeft +=300
    }
    
    const scrollLeft=()=>{
        console.log("start");
        scrollElement.current.scrollLeft -=300
    }
    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div ref={scrollElement} className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all'>
                <button onClick={scrollLeft}  className='bg-white shadow-md rounded-full absolute left-0 p-1 text-lg hidden md:block'>< FaAngleLeft/></button>
                <button onClick={scrollRight}  className='bg-white shadow-md rounded-full absolute right-0 p-1 text-lg hidden md:block'><FaAngleRight /></button>
        {
            loading?(
                loadingList.map((product, index) => {
                    console.log(product)
                    return (
                        <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] '>
                                {/* <img className='object-scale-down h-full hover:scale-110 transition-all' src={product.productImage[0]} alt="" /> */}
                            </div>
                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse rounded-full'></h2>
                                <p className='capitalize text-slate-500 animate-pulse rounded-full bg-slate-200'></p>
                            <div className='flex gap-2 w-full '>
                                <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>

                            </div>
                            <button className=' text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse '>
                            
                            </button>
                            </div>
                        </div>
                    )

                })
            )
            :(

                    data.map((product, index) => {
                        console.log(product)
                        return (
                            <Link to={'/product/'+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                    <img className='object-scale-down h-full hover:scale-110 transition-all' src={product.productImage[0]} alt="" />
                                </div>
                                <div className='p-4'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product.category}</p>
                                <div className='flex gap-2'>
                                    <p className='text-red-600 font-medium'>{displayPrice(product.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through'>{displayPrice(product.price)}</p>

                                </div>
                                <button onClick={(e)=>handleAddToCart(e,product._id)} className=' font-bold bg-red-500 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'>
                                    Add To Cart
                                </button>
                                </div>
                            </Link>
                        )

                    })
                

            )
        }
         

            </div>

        </div>
    )
}

export default HorizontalCardProduct