const { Schema, model } = require("mongoose");

const User = new Schema({
  username: {
    type: String,
    required: [true, "Username shart"],
    unique: true,
    trim: true,
    minLength: [3, "Kamida 3 ta belgi"],
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpTime: {
    type: BigInt,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "superadmin"],
    default: "user",
  },
}, {
  versionKey: false,
  timestamps: true,
});

const AuthSchema = model("User", User);
module.exports = AuthSchema;