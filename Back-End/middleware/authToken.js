const errorHandler = require("../utils/error.js")
const jwt =require('jsonwebtoken')

async function authToken(req,res,next){
    try{
        const token =req.cookies?.token 
        console.log("token",token);

        if(!token)
        {
            return res.status(200).json({message:"Please Login...!!!"})
        }

        jwt.verify(token,process.env.TOKEN_SECRET,function(err,decoded){
            console.log(err);
            console.log("decoded",decoded);

            if(err){
                console.log('ERROR AUTH',err);
            }
            req.userId =decoded._id
            next()
        })


    }
    catch(error){
        console.log(88888);
        next (errorHandler(404,"Token not exist"))
    }
}
module.exports =authToken