import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String, default: null },
    bio: { type: String, default: null },
    is_online: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    password: { type: String, required: true },
    verification_token: { type: String, default: null },
    verificationTokenExpires: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const User = mongoose.model("ChatUser", userSchema);
