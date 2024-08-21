import React, { useContext } from 'react'
import Logo from './Logo'
import { BiSearch } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { userData } from '../features/user/userSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import ROLE from '../common/Role';
import Context from '../context';

const Header = () => {

  const [menuDisplay,setMenuDisplay] = useState(false)

  const context=useContext(Context)
  console.log("context",context.cartProductCount);
  const dispatch=useDispatch();
  const navigate=useNavigate()

const handlelogout =async()=>{
  try{

 const res=await axios.get("http://localhost:3000/api/user/logout",{ withCredentials: true })
 console.log("logres",res);
 dispatch(userData(null))
  }
  catch(error)
  {
    console.log(error);
  }
}
const handleSearch =(e)=>{
   const {value} =e.target
   if(value){

     navigate(`/search?q=${value}`)
   }
   else{
    navigate('/search')
   }
}
const user=useSelector(state=> state?.user?.user?.data);
console.log("selector",user);

  return (
    <header className='h-20 w-full shadow-md  z-40 bg-white fixed'>
         <ToastContainer position='top-center' />

      <div className="h-full w-11/12 container mx-auto flex items-center px-4 justify-between ">

        <Link to={'/'} className="">
          <Logo w={120} h={70} />
        </Link>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-2 '>
          <input onChange={handleSearch} type="text" className='w-full outline-none py-1 rounded px-2' placeholder='SEARCH..' />
          <div className='text-lg h-8 min-w-[50px] bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <BiSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>
        <div className='relative flex justify-center'>

{
  user?._id && (
    <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
      {
        user?.profilePic ? (
          <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
        ) : (
          <FaRegCircleUser/>
        )
      }
    </div>
  )
}


{
  menuDisplay && (
    <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
      <nav>
        {
          user?.role === ROLE.ADMIN && (
            <Link to={"/admin-panel"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
          )
        }
       <Link  to={'/order'} onClick={()=>setMenuDisplay(preve => !preve)} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' >Order</Link>
      </nav>
    </div>
  )
}

</div>
{
  user?._id && (
          <Link to={'/cart'} className='text-2xl relative'>
            <span><FaShoppingCart /> </span>
            <div className='bg-red-600 text-white w-5 p-1 flex items-center justify-center h-5 rounded-full absolute -top-2 -right-3'>
              <p className='text-sm'>{context?.cartProductCount} </p>
            </div>
          </Link>
  )}
          <div>
          {user?._id?(
            <Link onClick={handlelogout} className='py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700'>LogOut</Link>

          ):
          (
            <Link to={'/login'} className='py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700'>Login</Link>

          )
        }
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header