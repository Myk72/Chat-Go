import express from "express";
import { verifyUser } from "../middleware/verify.js";
import {
  login,
  logout,
  signup,
  VerifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  ResendVerificationEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verifyEmail", VerifyEmail);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);
router.post("/checkAuth", verifyUser, checkAuth);
router.post("/resendVerification", ResendVerificationEmail);

export default router;
