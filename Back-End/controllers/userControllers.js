const User = require("../models/userModels.js")
const Product = require("../models/productModel.js")
const errorHandler = require("../utils/error.js");
const AddToCartModel = require("../models/cartModel.js");


const userdetails = (async (req, res, next) => {
    console.log("helloooocjoscso");
    try {

        console.log("req.userId", req.userId);
        const validUser = await User.findById(req.userId)

        if (!validUser) {
            next(errorHandler(404, "Can't fetch the User Data"))

        }

        res.status(201).json({ message: "User Data send SuccessFully", data: validUser })

    }
    catch (error) {
        next(errorHandler(404, "Can't fetch the User Data"))
    }

})
const getCategorySingleProduct = async (req, res, next) => {
    try {
        const productCategory = await Product.distinct("category")

        const productByCategory = []
        for (const category of productCategory) {
            const product = await Product.findOne({ category })
            // console.log("product",product);
            if (product) {
                productByCategory.push(product)
            }
        }
        res.status(201).json({ message: "User Data send SuccessFully", data: productByCategory, success: true, error: false })

    }
    catch (error) {
        next(errorHandler(404, "Can't fetch the CategoryProduct"))

    }
}

const getCategoryWiseProduct = async (req, res, next) => {
    console.log("start")

    try {
        const { category } = req?.body || req?.query
        console.log("category", category);
        const product = await Product.find({ category })
        res.status(201).json({ data: product, message: "Category Product Data send SuccessFully", success: true, error: false })
    }
    catch (error) {
        next(errorHandler(404, "Can't fetch the CategoryProduct"))

    }
}

const getProductDetails = async (req, res, next) => {
    const { productId } = req.body
    try {

        const productdata = await Product.findById(productId)
        res.status(201).json({ message: "Product Data send SuccessFully", data: productdata, success: true, error: false })

    }
    catch (error) {
        console.log(error)
        next(errorHandler(404, "Can't fetch the ProductDetails"))

    }
}

const addToCart = async (req, res, next) => {

    try {
        console.log("userrrrr", req.userId);
        console.log(req.body)
        const { id } = req.body
        console.log("id", id);
        const CartProduct = await AddToCartModel.findOne({ productId: id })
        console.log(1);
        console.log("CartProduct", CartProduct);
        if (CartProduct) {
            console.log(11);

            return res.status(409).json({
                message: "This Product Already Exist in Cart",
                success: false,
                error: true
            })
        }
        console.log(111);

        const payload = {
            productId: id,
            quantity: 1,
            userId: req.userId
        }

        const newProduct = new AddToCartModel(payload)
        const saveProduct = await newProduct.save()

        return res.status(200).json({
            message: "Added To Cart Successfully",
            success: true,
            error: false
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Please try Again",
            success: false,
            error: true
        })

    }
}

const CartCount = async (req, res, next) => {

    try {
        console.log("userrrrr", req.userId);

        const Count = await AddToCartModel.countDocuments({ userId: req.userId })
        console.log("Count", Count);
        res.status(201).json({ message: "Count fetched  SuccessFully", count: Count, success: true, error: false })

    }
    catch (error) {
        return res.status(500).json({
            message: "SomeError is occured",
            success: false,
            error: true
        })

    }
}

const GetCart=async(req,res,next)=>{
    console.log("1111");
    try{
        
        const userId=req.userId
        const allProduct= await AddToCartModel.find({userId:userId}).populate("productId")
        console.log("2222");
        res.status(201).json({data:allProduct, message: "Cart Items fetched  SuccessFully", success: true, error: false })

    }
    catch(error)
    {
        console.log("error",error);

        return res.status(500).json({
            message: "SomeError is occured",
            success: false,
            error: true
        })

    }
}

const updateAddToCartProduct=async(req,res)=>{
    try{
        console.log("updateAddToCartProduct",req.body);
        
         const currentUserId =req?.userId
         const addToCartProductId=req?.body?.id

         const qty=req.body.quantity

         const updateProduct = await AddToCartModel.updateOne({_id : addToCartProductId},{
            ...(qty && {quantity : qty})
        })
        res.status(201).json({data:updateProduct, message: "Cart Items Updated  SuccessFully", success: true, error: false })
            
        }
    catch(error)
    {
        console.log("updateAddToCartProduct",error);

        res.status(500).json({
            message: "SomeError is occured",
            success: false,
            error: true
        })
    }
}
const deleteCartItem=async(req,res,next)=>{

    try{
        console.log("deleteCartItem",req?.body)

        const deleteItem=await AddToCartModel.deleteOne({_id:req?.body.id})
        res.status(201).json({data:deleteItem, message: "Cart Items deleted  SuccessFully", success: true, error: false })


    }
    catch(error)
    {
        console.log("deleteCartItem",error);

        res.status(500).json({
            message: "SomeError is occured",
            success: false,
            error: true
        })
    }
}

const searchProduct=async(req,res)=>{
    console.log("searchProduct")
    try{
            const query=req.query.q
    }
    catch(error)
    {
        res.status(500).json({
            message: "SomeError is occured",
            success: false,
            error: true
        })
    }
}





module.exports = {
    userdetails,
    getCategorySingleProduct,
    addToCart, getCategoryWiseProduct,
    getProductDetails,
    CartCount,
    GetCart ,
    updateAddToCartProduct,
    deleteCartItem,
    searchProduct
}
