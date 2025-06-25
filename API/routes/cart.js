import express from 'express'
import { addToCart, deleteCart, deleteCartItem, getCartItem, getCartItemCount, UpdateCart } from '../controller/Cart.js'


const router = express.Router();

router.post('/addToCart/:wid',addToCart)
router.get('/getCartItemCount/:wid',getCartItemCount)
router.get('/getCartItem/:wid',getCartItem)
router.put('/UpdateCart/:wid',UpdateCart)
router.delete('/deleteCart/:id',deleteCart)
router.delete('/deleteCartItem/:userId/:cartId',deleteCartItem)
export default router