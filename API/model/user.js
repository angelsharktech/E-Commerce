import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    mob_no : Number,
    email:String,
    isAdmin:{type:Boolean , default:false},

})

export default mongoose.model('user',userSchema)