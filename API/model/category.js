import mongoose  from "mongoose";

const categorySchema = mongoose.Schema({
    // mainCategory: { type: String, required: true },
  // subCategories: [{ type: String }],
   categoryName : String,
  categoryBy: { type: String, required: true },
})

export default mongoose.model('category',categorySchema)