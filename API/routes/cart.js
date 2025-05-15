import express from 'express'
import { addToCart, getCartItemCount } from '../controller/Cart.js'


const router = express.Router()

router.post('/addToCart/:wid',addToCart)
router.get('/getCartItemCount/:wid',getCartItemCount)
// router.put('/updateCategory/:id',updateCategory)
// router.delete('/deleteCategory/:id',deleteCategory)
export default router