import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateToken, generateVerificationCode } from "../utils/randomGen.js";
import crypto from "crypto";
import {
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "../config/mail.config/sendEmail.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userExist = await User.findOne({
      email,
    });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const passwordhashed = await bcrypt.hash(password, 12);
    const verificationToken = generateVerificationCode();

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: passwordhashed,
      verification_token: verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
    });

    await sendVerificationEmail({ email, verificationToken });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    throw error;
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(res, user._id);
    user.lastLogin = Date.now();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        bio: user.bio,
        is_verified: user.is_verified,
        is_online: user.is_online,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    throw error;
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error" });
    throw error;
  }
};

export const VerifyEmail = async (req, res) => {
  const { token, email } = req.body;
  console.log("Email:", email, "Token:", token);

  try {
    const user = await User.findOne({
      email,
      verification_token: token,
      verificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }
    user.verification_token = undefined;
    user.verificationTokenExpires = undefined;
    user.is_verified = true;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error" });
    throw error;
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpires = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    await sendResetPasswordEmail({ email, resetToken });
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch {
    res.status(400).json({ success: false, message: "Error" });
    throw error;
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  // console.log("Reset Token:", token);
  // console.log("New Password", password);
  try {
    const user = await User.findOne({
      resetPasswordToken: token.split(":")[1],
      resetPasswordExpires: { $gt: Date.now() },
    });
    // console.log("User found:", user);
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }
    const passwordhashed = await bcrypt.hash(password, 12);
    user.password = passwordhashed;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json({ success: true, user });
  } catch {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const ResendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    if (user.is_verified) {
      return res.status(400).json({ error: "Email already verified" });
    }
    const verificationToken = generateVerificationCode();
    user.verification_token = verificationToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    await sendVerificationEmail({ email, verificationToken });
    res.status(200).json({
      success: true,
      message: "Verification email sent",
      user: { ...user._doc, password: undefined },
    });
  } catch {
    res.status(400).json({ success: false, message: error.message });
  }
};
