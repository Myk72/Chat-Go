import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    verification_token: {
      type: String,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
    verifcationTokenExpires: {
      type: Date,
      default: null,
    },
    profilePic: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
      unique: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("ChatUser", userSchema);
