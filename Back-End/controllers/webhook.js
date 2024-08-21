const stripe=require('../config/stripe');
const OrderModel = require('../models/OrderProductModel');
const AddToCartModel = require("../models/cartModel.js");

const endpointSecret =process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY
 
async function getLineItem(lineItems)
{
let ProductItems =[]
if(lineItems?.data?.length)
{
    for(const item of lineItems.data)
    {
       const product=await stripe.products.retrieve(item.price.product) 
       console.log("product",product);
        const productId=product.metadata.productId

       const productData={
        productId:productId,
        name:product.name,
        price:item.price.unit_amount /100,
        quantity:item.quantity,
        image:product.images
       }

       console.log("productDataproductData",productData);
       
       ProductItems.push(productData)

    }
}
return ProductItems
}

const webhooks=async(req,res)=>{
    const sig = req.headers['stripe-signature'];

    const payloadString=JSON.stringify(req.body)

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret:endpointSecret,
      });

    let event;
  try {
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      const lineItems=await stripe.checkout.sessions.listLineItems(session.id)
      console.log("lineItems",lineItems);
      console.log("session",session.amount_total/100);
      
      const productDetails=await getLineItem(lineItems)

      const orderDetails={
        productDetails:productDetails,
        email:session.customer_email,
        userId:session.metadata.userId,
        paymentDetails:{
            paymentId:session.payment_intent,
            payment_method_type:session.payment_method_types,
            payment_status:session.payment_status
           },
           shipping_options:session.shipping_options.map(s=>{
            return{
                ...s,
                shipping_amount:s.shipping_amount/100
            }
           }),
           totalAmount:session.amount_total/100
       }

       const order= new OrderModel(orderDetails)
       const saveOrder =await order.save()
       if(saveOrder?._id){
        const deleteCartItems=await AddToCartModel.deleteMany({userId:session.metadata.userId})
       }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send()

}
module.exports=webhooks