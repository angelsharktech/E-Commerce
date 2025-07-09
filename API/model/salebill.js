import mongoose from "mongoose";

const saleBillSchema = new mongoose.Schema({
  customer_name: { type: String ,required: true },
  mob_no: { type: String ,required: true },
  products: [
    {
      product_detail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // Single unit price
    },
  ],
  bill_amount: { type: Number, required: true },
  pay_mode: { type: String ,required: true }, // e.g., Cash, Card, etc.
  trans_no: { type: String  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("saleBill", saleBillSchema);
