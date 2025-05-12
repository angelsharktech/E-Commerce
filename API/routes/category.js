import express from 'express'
import { addCategory, deleteCategory, getCategory, updateCategory } from '../controller/category.js'

const router = express.Router()

router.post('/addCategory',addCategory)
router.get('/getCategory',getCategory)
router.put('/updateCategory/:id',updateCategory)
router.delete('/deleteCategory/:id',deleteCategory)
export default router