import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  actual_price: Number,
  selling_price: Number,
  avail_qty: Number,
  brand: { type: String, trim: true },
  age_group: String,
  // mainCategory:String,
  // subCategory:String,
  category: { type: String, trim: true },
  productBy: { type: String, trim: true },
  thumbnail: { type: String, trim: true },
  discount: Number,

  no_of_pieces: Number,
  assembly_req: { type: String, trim: true },
  scale: { type: String, trim: true },
  battery_req: { type: String, trim: true },
  battery_incl: { type: String, trim: true },
  material_type: { type: String, trim: true },
  remote_control: { type: String, trim: true },
  colour: { type: String, trim: true },
  prod_dimensions: { type: String, trim: true },
  manufacturer_recommend_age: { type: String, trim: true },
  manufacturer_name: { type: String, trim: true },
  item_weight: { type: String, trim: true },
  net_qty: Number,
  packer: { type: String, trim: true },
  isFavourite:{ type: String, trim: true },

  images: [String],
});

export default mongoose.model("product", productSchema);
