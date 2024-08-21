const stripe=require('../config/stripe')
const User = require('../models/userModels')

const paymentControl=async(req,res)=>{
    console.log("reached ",req?.body)
    console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

    try{
            const {cartItems} =req?.body
            console.log("cartItems ",cartItems);
            
            const user=await User.findOne({_id:req?.userId})
            
            const params={
                submit_type:"pay",
                mode: 'payment',
                payment_method_types :['card'],
                billing_address_collection:"auto",
                shipping_options:[
                    {
                        shipping_rate :'shr_1PoQABSIpyxLmt0ZK1zIf13p'
                    }
                ],
                customer_email:user.email,
                metadata:{
                    userId:req.userId
                },
                line_items:cartItems?.map((item,index)=>{
                    return{
                        price_data:{
                            currency:"inr",

                            product_data:{
                            name:item?.productId?.productName,
                            images:item?.productId?.productImage,
                            metadata:{
                                productId:item?.productId?._id
                            }
                            },
                            unit_amount:item?.productId?.sellingPrice *100,
                        
                        },
                        adjustable_quantity:{
                            enabled:true,
                            minimum:1
                        },
                        quantity:item.quantity

                    }
                }),
                success_url: `${process.env.FRONTEND_URL}/success`, // Replace with your frontend success URL
                cancel_url: `${process.env.FRONTEND_URL}/cancel`, // Replace with your frontend cancel URL
              }
            const session = await stripe.checkout.sessions.create(params);
            console.log("session1111111111",session);
            
              res.status(201).json(session)
    
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

module.exports={paymentControl}