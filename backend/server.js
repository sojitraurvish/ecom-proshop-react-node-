import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
// import products from "./data/products.js";
import connectDb from "./config/db.js"
import colors from "colors";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import {notFound,errorHandler} from "./middleware/errorMiddleware.js"
// const express=require("express");
// const dotenv=require("dotenv");
// const products=require("./data/products")

dotenv.config()

connectDb()

const app=express();

if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"))
}

app.use(express.json())

app.get("/",(req,res,next)=>{
    res.send("API is running")
})

app.use("/api/products",productRoutes)
app.use("/api/users",userRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/upload",uploadRoutes)

app.get("/api/config/paypal",(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname=path.resolve()
app.use("/uploads",express.static(path.join(__dirname,"/uploads")))

app.use(notFound)

app.use(errorHandler)

const PORT=process.env.PORT || 5000;


app.listen(5000,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold);
})