import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    title : String,
    description: String,
    actual_price : String,
    selling_price :String,
    avail_qty: String,
    category:String,
    thumbnail:String,
    images:[String]
})

export default mongoose.model('product',productSchema)