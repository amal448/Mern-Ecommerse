import { useState,useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, } from 'react-redux';
import {userData}  from '../src/features/user/userSlice'
import Context from './context';


function App() {
  const [cartProductCount, setCartProductCount] = useState(0)
  const dispatch=useDispatch()
  // const selector=useSelector()

  const fetchUserDetails = async () => {
    try {
        const dataResponse = await axios.get("http://localhost:3000/api/user/user-details", { withCredentials: true });
        
        // With axios, the parsed JSON response is in dataResponse.data
        const dataApi = dataResponse.data;
        console.log("dataApi", dataApi);
        
        // Assuming you have a dispatch function and userData action creator
        dispatch(userData(dataApi));
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
};
 const fetchUserAddToCart =async()=>{
  try {
    const dataResponse = await axios.get("http://localhost:3000/api/user/get-cartCount", { withCredentials: true });
    
    // With axios, the parsed JSON response is in dataResponse.data
    const dataApi = dataResponse.data;
    console.log("cartcount", dataApi?.count);
    setCartProductCount(dataApi?.count)
    
} catch (error) {
    console.error("Error fetching user details:", error);
}
 }
useEffect(()=>{
  //userDetails
  fetchUserDetails() 
  //Cart header Count
  fetchUserAddToCart()
},[])

  return (
    <>
    <Context.Provider value={{fetchUserDetails,//user fetch
      cartProductCount, //current user cart count
      fetchUserAddToCart 
      }}>

   <Header />
   <div className="container mx-auto px-10 pt-20">
   <Outlet />
   </div>
   <Footer /> 
   </Context.Provider>

    </>
  )
}

export default App ;
