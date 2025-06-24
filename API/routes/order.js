import express from 'express'
import { createOrder, getOrder, getOrderById, placeOrder, updateOrderStatus } from '../controller/order.js';

const router = express.Router();

router.post('/createOrder',createOrder)
router.post('/placeOrder',placeOrder)
router.get('/getOrder',getOrder)
router.get('/getOrderById/:id',getOrderById)
router.put('/updateOrderStatus/:id',updateOrderStatus)

export default router