import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const ProductDetails = () => {

    const [productdata, setProductData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",
    })
    const [loading, setLoading] = useState(true)
    const productImageListLoading = new Array(4).fill(null)
    const param = useParams()
    const productId = param.id
    const [activeImage,setActiveImage] =useState("")

    const[zoomImageCoordinate,setzoomImageCoordinate]=useState({x:0,y:0})
    const [zoomImage,setZoomImage]=useState(false)
    const fetchProductDetails = async () => {
        setLoading(true)
        const data = await axios.post('http://localhost:3000/api/user/get-productdetails', { productId })
        setProductData(data.data.data)
        setLoading(false)
        setActiveImage(data.data.data.productImage[0])

    }
    useEffect(() => {

        fetchProductDetails()
    }, [param])
    const handleMouseEnterProduct =(imageURL)=>{
        setActiveImage(imageURL)
    }
     const handlezoomImageCoordinate =useCallback((e)=>{
        setZoomImage(true)
        const {left,top,width,height}=e.target.getBoundingClientRect()
        console.log("left,top,width,height",left,top,width,height);

        const x=(e.clientX -left) / width
        const y=(e.clientY -top) / height
        
        setzoomImageCoordinate({x,y})
     }
    ,[zoomImageCoordinate])


     const handleZoomOutImage=()=>{
        setZoomImage(false)

     }



    return (
        <div className='container mx-auto p-4'>

            <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/* productImage */}
                <div  className="h-96 flex flex-col lg:flex-row-reverse gap-2">

                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 p-2 relative'>
                        <img src={activeImage} onMouseMove={handlezoomImageCoordinate} onMouseLeave={handleZoomOutImage} className='h-full w-full object-scale-down mix-blend-multiply' alt="" />
                    {
                        zoomImage &&(
                            <div className=' hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0'>
                            <div className='w-full h-full  min-w-[500px] min-h-[400px]  mix-blend-multiply scale-150' style={{backgroundImage:`url(${activeImage})`,
                        backgroundRepeat:'no-repeat',
                        backgroundPosition:`${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                        }}>

                            </div>
                        </div>
                        )
                    }
                       
                   
                   
                   
                   
                   
                   
                   
                   
                    </div>

                    <div className="h-full">
                        {
                            loading ? (
                              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                {
                                      productImageListLoading.map(() => {
                                    return (
                                        <div className='h-20 w-20 bg-slate-200 rounded'>

                                        </div>
                                    )
                                })
                                }
                              </div>

                            ) :
                                (
                                    <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                {
                                      productdata?.productImage.map((image) => {
                                    return (
                                        <div className='h-20 w-20 bg-slate-200 rounded p-1' key={image}>
                                            <img onMouseEnter={()=>handleMouseEnterProduct(image)} 
                                                 onClick={()=>handleMouseEnterProduct(image)}
                                            src={image} className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer' alt="" />
                                        </div>
                                    )
                                })
                                }
                              </div>
                                )
                        }
                    </div>
                </div>
                {/* productdetails */}
                {
                    loading?
                    (
                        <div className='grid gap-1 w-full'>
                        <p className='bg-slate-200 lg:h-10 animate-pulse rounded-full inline-block h-6 w-full px-5 '></p>
                        <h2 className='text-2xl lg:text-4xl lg:h-10 font-medium bg-slate-200 h-6 w-full  animate-pulse'></h2>
                        <p className='capitalize text-slate-400 lg:h-10 bg-slate-200 h-6 min-w-[100px] animate-pulse w-full'></p>
                     
                        <div className=' bg-slate-200 h-6 animate-pulse lg:h-10'>
                             
                        </div>
        
                        <div className='flex items-center gap-2 lg:h-10 text-2xl lg:text-3xl font-medium my-1 w-full  bg-slate-200 h-6 animate-pulse'>
                            <p className=' bg-slate-200 h-6 lg:h-10 animate-pulse w-full'></p>
                            <p className='bg-slate-200 lg:h-10 h-6 animate-pulse w-full'></p>
        
                        </div>
        
                        <div className='flex items-center gap-3 my-2'>
                            <button className='bg-slate-200 lg:h-10 rounded animate-pulse w-full'></button>
                            <button className='bg-slate-200 lg:h-10 rounded animate-pulse w-full'></button>
        
                        </div>
        
                        <div>
                            <p className="bg-slate-200 lg:h-10 rounded animate-pulse w-full"></p>
                            <p className="bg-slate-200 lg:h-10 rounded animate-pulse h-10 w-full"></p>
        
                        </div>
                        </div>
                    ):
                    (
                        <div className='flex flex-col gap-1'>
                        <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{productdata?.brandName}</p>
                        <h2 className='text-2xl lg:text-4xl font-medium'>{productdata?.productName}</h2>
                        <p className='capitalize text-slate-400'>{productdata?.category}</p>
                     
                        <div className='text-red-600 flex items-center gap-2'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalf />
                        </div>
        
                        <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                            <p className='text-red-500'>{displayCurrency(productdata.sellingPrice)}</p>
                            <p className='text-slate-400 line-through'>{displayCurrency(productdata.price)}</p>
        
                        </div>
        
                        <div className='flex items-center gap-3 my-2'>
                            <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white '>Buy</button>
                            <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white'>Add To Cart</button>
        
                        </div>
        
                        <div>
                            <p className="text-slate-600 font-medium my-1">Description</p>
                            <p className="text-slate-600 font-medium my-1">{productdata.description}</p>
        
                        </div>
                        </div>
                    )
                }
               
            </div>
            {
                productdata.category &&(

                    <CategoryWiseProductDisplay  category={productdata?.category} heading={'Recommented Product'}/>
                )
            }

        </div>
    )
}

export default ProductDetails