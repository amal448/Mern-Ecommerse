const mongoose =require("mongoose");

const AddToCartSchema =new mongoose.Schema(
    {
       productId:{
        ref:'products',
        type:String
       },
       quantity:Number,
       userId:String
    },{
        timestamps : true
    }
)
const AddToCartModel = mongoose.model('cartList', AddToCartSchema);
AddToCartModel.init();
module.exports = AddToCartModel;