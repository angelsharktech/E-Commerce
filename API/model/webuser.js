import mongoose from "mongoose";

const webuserSchema = mongoose.Schema({
  name: String,
  mob_no: Number,
  email: String,
  address: String,
  lane: String,
  city: String,
  state: String,
  pincode: String,
  // password: String,
  // cart: [String],
});

export default mongoose.model("webuser", webuserSchema);
