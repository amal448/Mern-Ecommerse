import React from 'react'
import { useState } from 'react';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import productCategory from '../helpers/productCategory';
import axios from 'axios';
import uploadImage from '../helpers/uploadImage';


function AdminEditProduct({productData,onClose,fetchdata}) {
    const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
    const [fullScreenImage,setFullScreenImage] = useState("")
     
    const [data,setData]=useState({
        productName:productData.productName,
        brandName:productData.brandName,
        category:productData.category,
        productImage:productData.productImage,
        description:productData.description,
        price:productData.price,
        sellingPrice:productData.sellingPrice,
        ...productData

    })

    const handleOnChange=(e)=>{
        console.log(e.target.name,e.target.value);
        const {name, value}=e.target
  
        setData((prev)=>{
          return{
            ...prev,
            [name]:value
          }
        })
  
  
  
      }
      const handleUploadProduct =async(e)=>{
          const file=e.target.files[0]
          // setUploadProductImageInput(file.name)
          console.log("file",file);
  
          const uploadImageCloudinary=await uploadImage(file)
          console.log("uploadImageCloudinary",uploadImageCloudinary.data.url);
  
          setData((prev)=>{
            return{
              ...prev,
              productImage:[...prev.productImage , uploadImageCloudinary.data.url]
            }
          })
  
  
      }
      const handleDelete =async(index)=>{
        const newProductImage =[...data.productImage]
        newProductImage.splice(index,1)
  
        setData((prev)=>{
          return{
            ...prev,
            productImage:[...newProductImage]
          }
        })
  
      }
  
      const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log("ffyugyigi",data)
  
        try{
          const res= await axios.post("http://localhost:3000/api/admin/edit-product",data, { withCredentials: true })
          console.log(res)
          if (res.success ===false)
            {
              console.log("false");
              return ;
            }
            onClose()
            fetchdata()
            console.log("false");
  
                }
      catch(error){
        console.log(error)
  
      }
  
  
  
  
      }
      console.log(data?.productImage);





  return (
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
    <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

         <div className='flex justify-between items-center pb-3'>
             <h2 className='font-bold text-lg'>Edit Product</h2>
             <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer'onClick={onClose} >
                 <CgClose/>
             </div>
         </div>

       <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
         <label htmlFor='productName'>Product Name :</label>
         <input 
           type='text' 
           id='productName' 
           placeholder='enter product name' 
           name='productName'
           value={data.productName}
           className='p-2 bg-slate-100 border rounded'
           required
           onChange={handleOnChange}
         />


         <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
         <input 
           type='text' 
           id='brandName' 
           placeholder='enter brand name' 
           name='brandName'
           value={data.brandName}

           className='p-2 bg-slate-100 border rounded'
           required
           onChange={handleOnChange}

         />

           <label htmlFor='category' className='mt-3'>Category :</label>
           <select required  name='category' value={data.category}  
           onChange={handleOnChange}
           className='p-2 bg-slate-100 border rounded'>
               <option value={""}>Select Category</option>

             {productCategory.map((el,index)=>{
                return(

                    <option value={el.value} key={el.value+index}>{el.label}</option>
                )
             })}
                
           </select>

           <label htmlFor='productImage' className='mt-3'>Product Image :</label>
           <label htmlFor='uploadImageInput'>
           <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                     <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                       <span className='text-4xl'><FaCloudUploadAlt/></span>
                       <p className='text-sm'>Upload Product Image</p>
                       <input type='file' id='uploadImageInput'onChange={handleUploadProduct}  className='hidden' />
                     </div>
           </div>
           </label> 
           <div>
            {
              data?.productImage[0]?(

            
                     <div className='flex items-center gap-2'>
                      {
                        data?.productImage.map((el,index)=>{
                          return(
                               <div className='relative group'>
                                   <img 
                                     src={el}
                                     alt="" 
                                     width={80} 
                                     height={80}  
                                     className='bg-slate-100 border cursor-pointer'  
                                     onClick={()=>{
                                      setOpenFullScreenImage(true)
                                      setFullScreenImage(el)
                                     }}/>

                                     <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDelete(index)}>
                                       <MdDelete/>  
                                     </div>
                               </div>
                                     )
                                    })
                                  }
                     </div>
                       ):(

                         <p className='text-red-600 text-xs'>*Please upload product image</p>
                       )
                      }
               
           </div>

           <label htmlFor='price' className='mt-3'>Price :</label>
           <input 
             type='number' 
             id='price' 
             placeholder='enter price' 
             name='price'
             value={data.price}

             className='p-2 bg-slate-100 border rounded'
             required
             onChange={handleOnChange}
           />


           <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
           <input 
             type='number' 
             id='sellingPrice' 
             placeholder='enter selling price' 
             name='sellingPrice'
             className='p-2 bg-slate-100 border rounded'
             value={data.sellingPrice}
             required
             onChange={handleOnChange}
           />

           <label htmlFor='description' className='mt-3'>Description :</label>
           <textarea 
             className='h-28 bg-slate-100 border resize-none p-1' 
             placeholder='enter product description' 
             rows={3} 
             name='description'
             value={data.description}

             onChange={handleOnChange}
           >
           </textarea>





           <button  className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
       </form> 



   
    </div>



    {/***display image full screen */}
    {
      openFullScreenImage &&(
        <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />

      )
    }
     

 </div>
  )
}

export default AdminEditProduct