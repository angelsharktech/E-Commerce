import express from 'express'
import { addProduct, deleteProduct, getProduct, getProductByCategory, getProductById, getProductByName, updateProduct } from '../controller/product.js'
import multer from 'multer'

const router = express.Router() 

const upload = multer({
    storage : multer.diskStorage({

        destination : (req, file,cb) =>{
            console.log('manasi');
            
            cb(null, 'gallery');
        },
        filename : (req, file,cb ) =>{
            console.log('gallery');
            let prefix = file.fieldname === "thumbnail" ? "thumbnail" : "images";
            cb(null, prefix +'_' + file.originalname)
        } 
    })
}).fields([
   {name: 'thumbnail' , maxCount:1} ,
   {name: 'images' , maxCount: 20}
])

router.post('/addProduct',upload,addProduct)
router.get('/getProduct',getProduct)
router.get('/getProductById/:id',getProductById)
router.get('/getProductByName/:name',getProductByName)
router.get('/getProductByCategory/:name',getProductByCategory)
router.put('/updateProduct/:id',updateProduct)
router.delete('/deleteProduct/:id',deleteProduct)
export default router