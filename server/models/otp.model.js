import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email Is Required To Generate OTP"],
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60,
  },
});

// Export the model
const OtpModel = mongoose.model('OtpModel', otpSchema)
export default OtpModel;
