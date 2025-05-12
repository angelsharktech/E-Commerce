import mongoose  from "mongoose";

const categorySchema = mongoose.Schema({
    categoryName : String
})

export default mongoose.model('category',categorySchema)