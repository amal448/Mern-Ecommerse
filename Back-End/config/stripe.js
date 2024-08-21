const Stripe =require('stripe')

const stripe= Stripe(process.env.STRIPE_Secret_key)


module.exports=stripe