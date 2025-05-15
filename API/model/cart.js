import mongoose, { Schema }  from "mongoose";
import webuser from "./webuser.js";

const cartSchema = mongoose.Schema({
    cart : [{
      _id: String,
      title: String,
      price: Number,
      quantity: { type: Number, default: 1 },
    }],
    webuser: { type: Schema.Types.ObjectId, ref: 'webuser' }
})

export default mongoose.model('cart',cartSchema)  
  
  