const User =require("../models/userModels.js")
const errorHandler =require("../utils/error.js")
const bcryptjs =require("bcrypt");
const jwt=require("jsonwebtoken")


 const  signup=async(req,res,next)=>{
    console.log(11111111111122222222222222222222222222222222222222222222222222222222);
    console.log(req.body);
    const {username,email,password}=req.body;
    const hashPassword=bcryptjs.hashSync(password,10);
    
    try{
        const newUser= new User({username,email,password:hashPassword,role:"GENERAL"})
        console.log("1234567890")
        const validUser= await User.findOne({email})
        if(validUser)
        {
            return next(errorHandler(404,"Account Already Exist !! "))

        }
        await newUser.save();
        res.status(201).json({message:"User created Successfully"})
    }
    catch (error) {
        next(error);
    }
}

 const  signin=async(req,res,next)=>{
    console.log("starteddddddddddddddd");
    console.log(req.body);
    const {email,password}=req.body;

    try{
        const validUser= await User.findOne({email})
        console.log("validUser",validUser);
        if(!validUser)
            {
                return next(errorHandler(404,"User Not Found"))
            }
        const validPassword=bcryptjs.compareSync(password,validUser.password)

        if(!validPassword)
            {
                return next(errorHandler(404,"Wrong credentials"))
            }
            console.log("11",process.env.TOKEN_SECRET)

        // const token=jwt.sign({id:validUser.id}, process.env.TOKEN_SECRET )
        // console.log(token);
        // const {password:hashPassword,...rest}=validUser._doc;
        // const expiryDate =new Date (Date.now() + 3600000);

        // res.cookie("access_token",token,{httpOnly:true,expires:expiryDate}).status(200).json(rest);
        const tokenData = {
            _id : validUser.id,
            email : validUser.email,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 8 });

        const tokenOption = {
            httpOnly : true,
            secure : true
        }

        res.cookie("token",token,tokenOption).status(200).json({
            message : "Login successfully",
            data : token,
            success : true,
            error : false
        })






    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
 
}

const logout = async (req, res, next) => {
    try {
        console.log("Clearing cookie");
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error logging out:", error);
        next(error); 
    }
};

module.exports = { signup, signin,logout };