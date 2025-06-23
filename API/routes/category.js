import express from 'express'
import { addCategory, deleteCategory, getCategory, getCategoryByMainCategory, getCategoryByShop, updateCategory } from '../controller/category.js'

const router = express.Router()

router.post('/addCategory',addCategory)
router.get('/getCategory',getCategory)
router.get('/getCategoryByMainCategory/:mainCategory',getCategoryByMainCategory)
router.get('/getCategoryByShop/:shop',getCategoryByShop)
router.put('/updateCategory/:id',updateCategory)
router.delete('/deleteCategory/:id',deleteCategory)
export default router