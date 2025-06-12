import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
  phone: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, expires: 600 } // 10 min expiry
});

export default mongoose.model('Otp', otpSchema);