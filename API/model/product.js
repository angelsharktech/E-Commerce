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

  no_of_pieces: Number,
  assembly_req: String,
  scale: String,
  battery_req: String,
  battery_incl: String,
  material_type: String,
  remote_control: String,
  colour: String,
  prod_dimensions: String,
  manufacturer_recommend_age: String,
  manufacturer_name: String,
  item_weight: String,
  net_qty: Number,
  packer: String,

  images: [String],
});

export default mongoose.model("product", productSchema);
