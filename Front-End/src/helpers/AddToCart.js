import axios from "axios";
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

const AddToCart=async(e,id)=>{
    e.stopPropagation();
    e.preventDefault()
    try{
        console.log("productIdddddddddd",id);
        const response=await axios.post("http://localhost:3000/api/user/addtoCart",{id},{ withCredentials: true })
        console.log(response)
        if (response.data.error === true) {
            toast.error(response.data.message);
              
              return ;
            }
            toast.success('Added To Cart SuccessFully');

    }
    catch(error)
    {
        toast.error(error.response.data.message);

    }
}
export default AddToCart;