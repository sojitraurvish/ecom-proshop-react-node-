import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler"

// @desc    Create new order
// @route   POST /api/order
// @access  Private
const addOrderItems=asyncHandler(async(req,res,next)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body;
    console.log(itemsPrice);
    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error("No order items")
        return
    }else{
        const order=new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder=await order.save();

        res.status(201).json(createdOrder)
    }

})
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderByID=asyncHandler(async(req,res,next)=>{
    
    const order=await Order.findById(req.params.id).populate("user","name email")

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error("Order not Found")
    }

})

export {addOrderItems,getOrderByID}