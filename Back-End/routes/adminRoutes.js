const express=require("express")
const {allUserdetails,updateUser,UploadProduct,GetProducts,editProduct}=require("../controllers/adminControllers")
const authToken = require("../middleware/authToken");
const router=express.Router()

router.get('/all-Users',authToken,allUserdetails)
router.post('/update-user',authToken,updateUser)
router.post('/all-products',authToken,UploadProduct)
router.post('/edit-product',authToken,editProduct)
router.get('/all-Products',authToken,GetProducts)



module.exports = router;