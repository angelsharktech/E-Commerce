import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'webuser',
    required: true,
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // Single unit price
    }
  ],

  shippingInfo: {
    name: { type: String, required: true },
    mob_no: { type: String, required: true },
    email: { type: String},
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },

  paymentMethod: {
    type: String,
    enum: ['COD', 'RAZORPAY'],
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },

  razorpayDetails: {
    orderId: { type: String },
    paymentId: { type: String },
    signature: { type: String },
  },

  orderStatus: {
    type: String,
    default: 'Processing',
  },

  totalAmount: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Order', orderSchema);
