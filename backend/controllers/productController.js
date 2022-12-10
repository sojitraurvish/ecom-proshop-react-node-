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

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public/Admin
const deleteProduct=asyncHandler(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(product){
        await product.remove()
        res.json({message:"Product removed"})
    }else{
        // res.status(404).json({message:"Product not found"})//but now we have error handling middleware
        res.status(404)
        throw new Error("Product not found")
    }

})

// @desc    Create a product
// @route   POST /api/products
// @access  Public/Admin
const createProduct=asyncHandler(async(req,res,next)=>{
    const product=new Product({
        name:"Sample name",
        price:0,
        user:req.user._id,
        image:"/images/sample.jpg",
        brand:"Sample brand",
        category:"Sample category",
        countInStock:0,
        numReviews:0,
        description:"Simple desctipring"
    })

    const createdProduct=await product.save()

    res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   UPDATE /api/products/:id
// @access  Public/Admin
const updateProduct=asyncHandler(async(req,res,next)=>{
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    }=req.body

    const product=await Product.findById(req.params.id)

    if(product){
        product.name=name;
        product.price=price;
        product.description=description;
        product.image=image;
        product.brand=brand;
        product.category=category;
        product.countInStock=countInStock;

        const updatedProduct=await product.save()
        res.status(201).json(updatedProduct)
    }else{
        res.status(404)
        throw new Error("Product not found")
    }

})

export {getProductById,getProducts,deleteProduct,createProduct,updateProduct}