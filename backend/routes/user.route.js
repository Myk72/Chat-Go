import express from "express";
import { verifyUser } from "../middleware/verify.js";
import { getAllUsers, updateProfilePic, getMessage, sendMessage } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.put("/updateProfilePic", verifyUser,  updateProfilePic); // update profile pic
userRouter.get("/getAllUsers", verifyUser,  getAllUsers); // get all users except the logged in user
userRouter.get("/message/:id", verifyUser, getMessage) // get message from user
userRouter.post("/message/:id", verifyUser, sendMessage) // send message to user

export default userRouter;
