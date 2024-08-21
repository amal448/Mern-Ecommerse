import React from 'react'
import { Link } from 'react-router-dom'
const Cancel = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 my-32 rounded'
    >
    <img src="http://portal.maktabsoft.ir/95136081/component/messenger/assets/images/failed.gif"width={150} height={150} alt="" />
    <p className='text-red-600 font-bold text-xl'>Payment Failed!!</p>
    <Link className="p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-white hover:text-white bg-red-600 ">See Order</Link>
    </div>
  )
}

export default Cancel