import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler"

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts=asyncHandler(async(req,res,next)=>{
    const products=await Product.find({});

    // res.status(401)
    // throw new Error("not Authorized") see front end
    res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById=asyncHandler(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(product){
        res.json(product)
    }else{
        // res.status(404).json({message:"Product not found"})//but now we have error handling middleware
        res.status(404)
        throw new Error("Product not found")
    }

})

export {getProductById,getProducts}