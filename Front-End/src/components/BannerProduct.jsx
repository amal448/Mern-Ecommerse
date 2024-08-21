import {useEffect, useState} from 'react'
import Image1 from '../assest/banner/img1.webp'
import Image2 from '../assest/banner/img2.webp'
import Image3 from '../assest/banner/img3.jpg'
import Image4 from '../assest/banner/img4.jpg'
import Image5 from '../assest/banner/img5.webp'

import imageMobile1 from '../assest/banner/img1_mobile.jpg'
import imageMobile2 from '../assest/banner/img2_mobile.webp'
import imageMobile3 from '../assest/banner/img3_mobile.jpg'
import imageMobile4 from '../assest/banner/img4_mobile.jpg'
import imageMobile5 from '../assest/banner/img5_mobile.png'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage,setCurrentImage]=useState(0)
    const deskTopImages=[
        Image1,Image2,Image3,Image4,Image5
    ]
    const MobileImages=[
        imageMobile1,imageMobile2,imageMobile3,imageMobile4,imageMobile5
    ]

    const nextImage=()=>{
        if(deskTopImages.length -1>  currentImage)
        {
            setCurrentImage(prev=>prev+1)
        }
    }
    const prevImage=()=>{
            if(currentImage!=0)
            {
                setCurrentImage(prev=>prev-1)
            }
    }

    useEffect(()=>{
        const intervel =setInterval(()=>{
        if(deskTopImages.length -1 >  currentImage)
        {
            nextImage()

        }
        else{
            setCurrentImage(0)

        }
        },2000)

        return ()=> clearInterval(intervel)
    },[currentImage])


    return (
        <div className='container mx-auto px-4 rounded overflow-hidden '>
            <div className='h-56 md:h-96 w-full bg-slate-200 relative'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                <div className="flex justify-between w-full text-2xl">
                <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'>< FaAngleLeft/></button>
                <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                </div>

                </div>
                
                {/* desktop and tab banner */}
               <div className='hidden md:flex h-full w-full '>
               {
                deskTopImages.map((imageURL,index)=>{
                    return(

                        <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform :`translateX(-${currentImage *100}%)`}}>
                        <img src={imageURL} className='w-full h-full'/>
                        </div>

                    )
                })
            }

           
               </div>

                  {/* Mobile banner */}
               <div className='flex h-full w-full overflow-hidden md:hidden'>
               {
                MobileImages.map((imageURL,index)=>{
                    return(

                        <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform :`translateX(-${currentImage *100}%)`}}>
                        <img src={imageURL} className='w-full h-full object-cover'/>
                        </div>

                    )
                })
            }

           
               </div>

            </div>
        </div>

    )
}

export default BannerProduct