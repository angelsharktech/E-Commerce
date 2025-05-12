import mongoose from "mongoose";

const webuserSchema = mongoose.Schema({
  name: String,
  password: String,
  mob_no: Number,
  email: String,
  address: String,
  pincode: String,
});

export default mongoose.model("webuser", webuserSchema);
