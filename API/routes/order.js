import express from 'express'
import { createOrder, placeOrder } from '../controller/order.js';

const router = express.Router();

router.post('/createOrder',createOrder)
router.post('/placeOrder',placeOrder)

export default router