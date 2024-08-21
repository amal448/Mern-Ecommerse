const express = require("express")
const cors =require("cors");
require("dotenv").config()
const mongoose=require("mongoose")
const userRoutes=require("./routes/userRoutes.js")
const adminRoutes=require("./routes/adminRoutes.js")
const cookieparser =require("cookie-parser")

const app= express()
app.use(express.json());
app.use(cookieparser());

const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes)



app.listen(3000,()=>{
    console.log("Server is running")
})
const connectionString = process.env.MONGO_URI; // Adjust as necessary

mongoose.connect(connectionString).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });