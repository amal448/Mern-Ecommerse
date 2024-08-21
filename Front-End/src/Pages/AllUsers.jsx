import React, { useState } from 'react'
 import axios from 'axios'
import { useEffect } from 'react'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

function AllUsers() {
    const [users,setUsers]=useState([])
    const [openupdateUser,setopenupdateuser] =useState(false)
    
    const [updateuserDetails,setUpdateuserdetails] =useState({
        email:"",
        username:"",
        role:"",
        userId:""
    })
    useEffect(()=>{
        FetchAllUsers()
    },[])

    const FetchAllUsers=async()=>{
        try{

            const data= await axios.get("http://localhost:3000/api/admin/all-Users", { withCredentials: true })

            console.log(data.data.data);
            setUsers(data.data.data)
        }
        catch(error){
            console.log(error);
        }
        
    }
    console.log(users); 
  return (
    <div>
        <table className='w-full userTable'>
            <thead>
                <tr className='bg-black text-white'>
                <th>Sr</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created</th>
                <th>Action</th>


                </tr>
            </thead>
        <tbody>
        {
            users?.map((item,index)=>{
                return(
                    <tr>
                        <td>{index+1}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>{moment(item.createdAt).format('LL')}</td>
                        <td>
                            <button onClick={()=>{
                                setUpdateuserdetails(item)
                                setopenupdateuser(true)
                            }
                                                
                            } className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500'>

                        <MdModeEdit />
                            </button>
                        </td>

                    </tr>
                )
            })
        }
        </tbody>
        </table>
            {
                openupdateUser &&(
                    <ChangeUserRole onClose={()=>setopenupdateuser(false)}
                                    name={updateuserDetails.username}
                                    email={updateuserDetails.email}
                                    role={updateuserDetails.role}
                                    userId={updateuserDetails._id}
                                    callFunc={FetchAllUsers}


                    />
                )
            }

    </div>
  )
}

export default AllUsers