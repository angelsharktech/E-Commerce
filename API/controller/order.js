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
