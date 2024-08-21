import React, { useState } from 'react'
import ROLE from '../common/Role'
import { IoMdClose } from "react-icons/io";
import axios from 'axios'

function ChangeUserRole({name,email,role,onClose,userId,callFunc}) {

    const [userRole,setUserRole] =useState(role)

    const handleChangeRole =(e)=>{
        setUserRole(e.target.value)
    }
   const data={
    role:userRole,
    userId
   }
    const updateUserRole =async()=>{
        try{
            const res= await axios.post("http://localhost:3000/api/admin/update-user",{data}, { withCredentials: true })
            console.log(res.data.success);
            console.log(res.data.success);
            if(res.data.success){
                onClose()
                callFunc()
            }
            
        
        }
        catch(error){
            console.log(error);
        }

   } 

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
 
             <button className='block ml-auto' onClick={onClose} >
             <IoMdClose/>
             </button>
 
             <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
 
              <p>Name : {name}</p>   
              <p>Email : {email}</p> 
 
             <div className='flex items-center justify-between my-4'>
                 <p>Role :</p>  
                 <select className='border px-4 py-1' value={userRole} onChange={handleChangeRole} >
                    {
                        Object.values(ROLE).map(el =>{
                            return (

                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
                 </select>
             </div>
 
 
             <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
        </div>
     </div>
    )
}

export default ChangeUserRole