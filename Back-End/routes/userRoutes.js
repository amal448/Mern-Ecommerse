const express=require("express")
const { signup, signin,logout } = require("../controllers/authControllers");
const {userdetails,getCategorySingleProduct,getCategoryWiseProduct,getProductDetails,addToCart,CartCount , GetCart,updateAddToCartProduct,deleteCartItem,searchProduct} =require("../controllers/userControllers");
const {paymentControl}=require('../controllers/paymentController')
const {OrderList}=require("../controllers/orderController")
const authToken = require("../middleware/authToken");
const webhooks=require("../controllers/webhook")
const router=express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/user-details',authToken,userdetails)
router.get('/get-category-singleproduct',getCategorySingleProduct)
router.post('/get-categoryproducts',getCategoryWiseProduct)
router.post('/get-productdetails',getProductDetails)
router.post('/addtoCart',authToken,addToCart)
router.get('/get-cartCount',authToken,CartCount)
router.get('/get-cart',authToken,GetCart)
router.post('/update-cart',authToken,updateAddToCartProduct)
router.post('/delete-cart',authToken,deleteCartItem)
router.get('/search',searchProduct)

//payment and order
router.post('/checkout',authToken,paymentControl)
router.post('/webhook',webhooks) //api/webhook
router.get('/get-orderlist',authToken,OrderList)


router.get('/logout',logout)
paymentControl
module.exports = router;