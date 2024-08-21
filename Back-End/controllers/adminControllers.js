const User =require("../models/userModels.js")
const errorHandler =require("../utils/error.js")
const Products=require("../models/productModel.js")

const allUserdetails=async(req,res,next)=>{
    try{
        console.log("hererererere");
        
        const users=await User.find()
        console.log(users);
    if(!users)
    {
        next(errorHandler(404,"Unable to Fetch Data"))
    }
    res.status(201).json({message:"Users Data Fetched Successfully",data:users})
    
    }
    catch(error)
    {
        console.log(error);
        next(errorHandler(404,"Unable to Fetch Data"))

    }
}

const updateUser =async(req,res,next)=>{
    try{
        console.log("ndfkkklkvldnkdvkdmkdnvkldnvllkdvd");
        console.log("update userrr",req.body)
        const {userId,email,name,role} =req.body.data
        console.log(userId);
        console.log(role);

        const payload={
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role})
        }
        console.log(payload.role);
        const updateUser=await User.findByIdAndUpdate(userId,payload)

        res.status(201).json({message:"User Updated",success:true,error:false})
    }
    catch (error)
    {
        next(errorHandler(404,"Failed to Update UserData"))
    }
}

const UploadProduct =async(req,res,next)=>{
    try{
        const UploadProduct=new Products(req.body)
        const saveProduct=await UploadProduct.save()
        res.status(201).json({message:"Product Uploaded",success:true,error:false,data:saveProduct})
        
    }
    catch(error)
    {
        next(errorHandler(404,"Failed to Update productData"))

    }
}

const GetProducts=async(req,res,next)=>{
    console.log("121212121")
    try{
        const getProduct=await Products.find();
        res.status(201).json({message:"Products Fetched SuccessFully",success:true,error:false,data:getProduct})


    }
    catch(error)
    {
        next(errorHandler(404,"Failed to Update productData"))

    }
}

const editProduct=async(req,res,next)=>{
    console.log(req.body);

    try{
        const { _id, ...resBody}=req.body
    console.log(_id);
    console.log(resBody);
    const editproduct=await Products.findByIdAndUpdate(_id,resBody, { new: true } )
    console.log(editProduct);
    res.status(201).json({message:"Products updated SuccessFully",success:true,error:false,data:editproduct})


    }
    catch(error)
    {
        next(errorHandler(404,"Failed to Update productData"))
    }    
}

module.exports={allUserdetails,updateUser,UploadProduct,GetProducts,editProduct}