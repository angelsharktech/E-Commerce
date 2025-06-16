import Otp from "../model/otp.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import otpGenerator from "otp-generator";
import twilio from "twilio";
import webuser from "../model/webuser.js";

export const sendOtp = async (req, res, next) => {
  const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
  console.log("Sending OTP to:", req.body.phone);

  const phone = "+91" + req.body.phone;
  //   const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
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
    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "OTP send failed", error: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    console.log("Verifying OTP for:", req.body);
    const phone = "+91" + req.body.phone;
    const otp = req.body.otp;
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    //   const hashedOtp = otp;
    const otpRecord = await Otp.findOne({ phone });

    if (!otpRecord || otpRecord.otp !== hashedOtp) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Invalid or expired OTP",
          otpRecord: otpRecord,
          otp: otpRecord.otp,
          hashedOtp: hashedOtp,
        });
    }
    const token = jwt.sign({ phone }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3600000,
    });
    res.json({ success: true, token: token, phone: phone });
    await Otp.deleteOne({ phone });

  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    // console.log("Fetching user data for:", req.user);
    const user = await webuser.findOne({ mob_no: req.user.phone });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
