const OrderModel=require("../models/OrderProductModel")

const OrderList=async(req,res,next)=>{
    try{

        const currentUserId=req.userId
        const order=await OrderModel.find({userId:currentUserId}).sort({createdAt:-1})

        res.status(201).json({data:order, message: "Order List Fetched  SuccessFully", success: true, error: false })

    }
    catch(error)
    {
        console.log(error);
        
        res.status(500).json({
            message: "SomeError is occured",
            success: false,
            error: true
        })
    }
}
module.exports={OrderList}