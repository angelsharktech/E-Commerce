import Otp from '../model/otp.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import otpGenerator from 'otp-generator';
import twilio from 'twilio';

export const sendOtp = async (req, res, next) => {
  const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
  console.log("Sending OTP to:", req.body.phone);

  const phone = '+91' + req.body.phone;
//   const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
 const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
//   const hashedOtp = otp;
  await Otp.findOneAndUpdate(
    { phone },
    { otp: hashedOtp, createdAt: Date.now() },
    { upsert: true, new: true }
  );

  try {
    await twilioClient.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });
    res.json({ success: true, message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'OTP send failed', error: err.message });
  }
};

export const verifyOtp = async (req, res) => {
    console.log("Verifying OTP for:", req.body);
    
  const phone = '+91' + req.body.phone;
  const otp = req.body.otp;
  const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
//   const hashedOtp = otp;

  const otpRecord = await Otp.findOne({ phone });
  console.log(otpRecord);
  
  if (!otpRecord || otpRecord.otp !== hashedOtp) {
    return res.status(401).json({ success: false, message: 'Invalid or expired OTP' });
  }

  const token = jwt.sign({ phone }, process.env.JWT, { expiresIn: '1h' });
  await Otp.deleteOne({ phone });
  res.json({ success: true, token: token });
};