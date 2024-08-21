import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

function AdminPanel() {

    return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

    <aside className='bg-white min-h-full  w-full  max-w-60 customShadow'>
            <div className='h-32  flex justify-center items-center flex-col'>
                <div className='text-5xl cursor-pointer relative flex justify-center'>
                  
                </div>
                <p className='capitalize text-lg font-semibold'>Name</p>
                <p className='text-sm'>Role</p>
            </div>

             {/***navigation */}       
            <div>   
                <nav className='grid p-4'>
                    <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                    <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
                </nav>
            </div>  
    </aside>

    <main className='w-full h-full p-2'>
        <Outlet/>
    </main>
</div>
  )
}

export default AdminPanel