import express from "express";
import {
  searchUsers,
  updateProfilePic,
  getUserConversation
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.put("/uploadProfilePic", updateProfilePic);
userRouter.get("/", searchUsers);
userRouter.get("/conversation", getUserConversation);

export default userRouter;
