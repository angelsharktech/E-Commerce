import Razorpay from "razorpay";
import dotenv from "dotenv";
import order from "../model/order.js";
dotenv.config();

export const createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log(error);
  }
};

export const placeOrder = async (req, res, next) => {
  try {
    // console.log(req.body);
    
    const newOrder = new order(req.body);
    const savedOrder = await newOrder.save();
    // console.log('save::',savedOrder);
    
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to save order" });
  }
};
export const getOrder = async (req, res, next) => {
  try {
    
    const result = await order.find().populate('products.product');
    
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get order" });
  }
};
export const getOrderById = async (req, res, next) => {
  try {
    
    const result = await order.find({user: req.params.id}).populate('products.product');
    
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get order" });
  }
};
export const updateOrderStatus =  async (req, res) => {
  try {
    
    const result = await order.findByIdAndUpdate({_id:req.params.id}, req.body , {new:true});
    res.status(200).json({msg:"Product Updated successfully...", result});
  } catch (error) {
    console.log(error)
  }
};
export const getOrderByOrderId = async (req, res, next) => {
  try {    
    console.log();
    
    const result = await order.find({_id: req.params.oid});
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get order" });
  }
};
export const getOrderByStatus = async (req, res, next) => {
  try {    
    const result = await order.find({orderStatus: req.params.status}).populate('products.product').sort({ createdAt: 'desc' });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get order" });
  }
}
export const getOrderByStatusAndDate = async (req, res, next) => {
  try {
     const start = new Date();
    start.setHours(0, 0, 0, 0); // today at 00:00:00

    const end = new Date();
    end.setHours(23, 59, 59, 999); // today at 23:59:59

    const result = await order.find({
      orderStatus: 'Processing',
      createdAt: {
        $gte: start,
        $lte: end
      }
    });    
    res.status(200).json(result.length);
  } catch (error) {
    res.status(500).json({ error: "Failed to get order" });
  }
}