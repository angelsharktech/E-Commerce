import express from 'express'
import { addProduct, deleteProduct, filter, getProduct, getProductByCategory, getProductById, getProductByName, getProductByShop, getProductSuggestions, updateProduct } from '../controller/product.js'
import multer from 'multer'
import auth from '../middleware/auth.js'

const router = express.Router() 

const upload = multer({
    storage : multer.diskStorage({

        destination : (req, file,cb) =>{
            cb(null, 'gallery');
        },
        filename : (req, file,cb ) =>{
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
router.get('/getProductByShop/:shop',getProductByShop)
router.patch('/updateProduct/:id',updateProduct)
router.delete('/deleteProduct/:id',deleteProduct)
router.get('/suggest', getProductSuggestions);
router.get('/filter',filter)

export default router