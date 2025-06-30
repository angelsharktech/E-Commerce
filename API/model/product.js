import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  actual_price: Number,
  selling_price: Number,
  avail_qty: Number,
  brand: String,
  age_group: String,
  // mainCategory:String,
  // subCategory:String,
  category: String,
  productBy: String,
  thumbnail: String,
  discount: Number,
  images: [String],
});

export default mongoose.model("product", productSchema);
