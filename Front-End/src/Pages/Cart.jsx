import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Context from '../context'
import displayCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchUserCart = async () => {
        try {
            setLoading(true)
            const res = await axios.get("http://localhost:3000/api/user/get-cart", { withCredentials: true })
            if (res?.data?.success == true) {
                setData(res?.data?.data)
            }


        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)

        }
    }
    const increaseQty = async (id, qty) => {

        const data = {
            id,
            quantity: qty + 1
        }
        const res = await axios.post("http://localhost:3000/api/user/update-cart", data, { withCredentials: true })
        console.log(res)
        if (res.data.success === true) {
            fetchUserCart()

        }
    }
    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {

            const data = {
                id,
                quantity: qty - 1
            }
            const res = await axios.post("http://localhost:3000/api/user/update-cart", data, { withCredentials: true })
            console.log(res)
            if (res.data.success === true) {
                fetchUserCart()

            }
        }
    }
    
    const deleteCartItems = async (id) => {
        console.log("id", id);
        try {
            const res = await axios.post("http://localhost:3000/api/user/delete-cart", { id }, { withCredentials: true })
            console.log(res)
            if (res.data.success === true) {
                fetchUserCart()
                context.fetchUserAddToCart()


            }
        }
        catch (error) {
            console.log(error);

        }

    }
    const handlePayment = async () => {
        try {
            console.log("import.meta.env.VITE_STRIPE_PUBLIC_KEY", import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
            const res = await axios.post("http://localhost:3000/api/user/checkout", { cartItems: data }, { withCredentials: true });
            console.log("Payment response", res);
    
            if (stripe && res.data?.id) {
                console.log("Redirecting to Stripe with sessionId:", res.data.id);
                const { error } = await stripe.redirectToCheckout({ sessionId: res.data.id });
                if (error) {
                    console.error("Stripe redirect error:", error.message);
                }
            } else {
                console.error("Stripe initialization failed or session ID is missing.");
            }
        } catch (error) {
            console.error("Payment error", error.response ? error.response.data : error.message);
        }
    };
    
    

    useEffect(() => {
        fetchUserCart()
    }, [])

    const TotalQuantity = data.reduce((prev, curr) => prev + curr?.quantity, 0)
    const TotalSum = data.reduce((prev, curr) => prev + (curr?.productId?.sellingPrice * curr.quantity), 0)
    return (
        <div className='container mx-auto'>
            <div className="text-center text-lg my-3">
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Data</p>
                    )
                }
            </div>
            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>

                {/* view product */}
                <div className='w-full max-w-3xl'>
                    {

                        loading ? (
                            loadingCart?.map((el, index) => {
                                return (
                                    <div key={el + "Add To Cart Loading" + index} className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded">

                                    </div>
                                )

                            })

                        )
                            : (
                                data?.map((product, index) => {
                                    console.log("product product", product)
                                    return (
                                        <div key={product?._id + "Add To Cart Loading"} className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]">
                                            <div className='w-32 h-32 bg-slate-200'>
                                                <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply ' alt="" />
                                            </div>
                                            <div>
                                                <div className='px-4 py-2 relative'>
                                                    <div onClick={() => deleteCartItems(product?._id)} className='absolute right-0 text-red-600 rounded-full p-2  bg-white hover:bg-red-600 hover:text-white cursor-pointer'>
                                                        <MdDelete />
                                                    </div>
                                                    <h2 className='text-xl lg:text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                                    <p className='capitalize'>{product?.productId?.category}</p>

                                                    <div className='flex justify-between'>
                                                        <p className='text-red-600 font-medium text-lg'>{displayCurrency(product?.productId?.sellingPrice)}</p>
                                                        <p className='text-slate-600 font-semibold text-lg'>{displayCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>

                                                    </div>


                                                    <div className='flex items-center gap-3 mt-1'>
                                                        <button className=' border border-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                                        <span>{product?.quantity}</span>
                                                        <button className=' border border-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                    }

                </div>
                {/* summary  */}
                {
                    data[0] &&(
                        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                                <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                    Total
                                </div>
                            ) :
                                (
                                    <div className='h-auto bg-white'>
                                        <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                        <div className='flex items-center justify-between p-2 font-medium text-lg text-slate-600'>
                                            <p>Quantity</p>
                                            <p>{TotalQuantity}</p>
                                        </div>
    
                                        <div className='flex items-center justify-between p-2 font-medium text-lg text-slate-600'>
                                            <p>Total Price</p>
                                            <p>{displayCurrency(TotalSum)}</p>
                                        </div>
                            <button className='bg-blue-600 p-4 w-full text-white' onClick={handlePayment}>Payment</button>
    
                                    </div>
                                )
                        }
    
                    </div>
                    )
                }

            </div>
        </div>
    )
}

export default Cart