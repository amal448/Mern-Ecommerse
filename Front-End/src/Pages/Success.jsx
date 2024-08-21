import React from 'react'
import { Link } from 'react-router-dom'
const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 my-32 rounded'
    >
    <img src="https://i.pinimg.com/originals/35/f3/23/35f323bc5b41dc4269001529e3ff1278.gif"width={150} height={150} alt="" />
    <p className='text-green-600 font-bold text-xl'>Payment SuccessFully</p>
    <Link to={'/order'} className="p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-white hover:text-white bg-green-600 ">See Order</Link>
    </div>
  )
}

export default Success