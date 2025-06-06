import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    title : String,
    description: String,
    actual_price : Number,
    selling_price :Number,
    avail_qty: Number,
    category:String,
    productBy:String,
    thumbnail:String,
    discount : String,
    images:[String]
})

export default mongoose.model('product',productSchema)