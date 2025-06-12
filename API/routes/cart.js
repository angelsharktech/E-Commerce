import express from 'express'
import { addToCart, getCartItem, getCartItemCount, UpdateCart } from '../controller/Cart.js'


const router = express.Router();

router.post('/addToCart/:wid',addToCart)
router.get('/getCartItemCount/:wid',getCartItemCount)
router.get('/getCartItem/:wid',getCartItem)
router.put('/UpdateCart/:wid',UpdateCart)
// router.delete('/deleteCategory/:id',deleteCategory)
export default router