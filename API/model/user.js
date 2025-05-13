import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    mob_no : String,
    email:String,
    shop_name:String,
    shop_address:String,
    gst_no:String,
    isAdmin:{type:Boolean , default:false},

})

export default mongoose.model('user',userSchema)