import express from "express";
import {
  searchUsers,
  updateProfilePic,
  getUserConversation,
  editProfile
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.put("/uploadProfilePic", updateProfilePic);
userRouter.get("/", searchUsers);
userRouter.get("/conversation", getUserConversation);
userRouter.put("/editProfile", editProfile);

export default userRouter;
