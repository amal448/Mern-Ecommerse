import React from 'react'
import { createBrowserRouter  } from "react-router-dom";
import App from "../App";
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup';
import AdminPanel from '../Pages/AdminPanel';
import AllUsers from '../Pages/AllUsers';
import AllProducts from '../Pages/AllProducts';
import CategoryProduct from '../Pages/CategoryProduct';
import ProductDetails from '../Pages/ProductDetails';  
import Cart from '../Pages/Cart';
import SearchProduct from '../Pages/SearchProduct';
import Success from '../Pages/Success';
import Cancel from '../Pages/Cancel';
import OrderPage from '../Pages/OrderPage';
const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/category-product/:category",
          element: <CategoryProduct />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/cart",
          element: <Cart/>,
        },
        {
          path: "/search",
          element: <SearchProduct/>,
        },
        {
          path: "/success",
          element: <Success/>,
        },  {
          path: "/cancel",
          element: <Cancel/>,
        },
        {
          path: "/order",
          element: <OrderPage/>,
        },
        {
          path: "/admin-panel",
          element:<AdminPanel />,
          children: [
            {
              path: "all-users",
              element: <AllUsers />,
            },
            {
              path: "all-products",
              element:<AllProducts />,
            }
          ]
        },









      ],
    },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        
     
  ]);

  export default router