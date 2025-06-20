import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: null },
    bio: { type: String, default: null },
    is_verified: { type: Boolean, default: false },
    verification_token: { type: String, default: null },
    verificationTokenExpires: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });


// userSchema.methods.matchPassword = function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };

export const User = mongoose.model("ChatUser", userSchema);
