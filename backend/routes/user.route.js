import express from "express";
import {
  searchUsers,
  updateProfilePic,
  getMessage,
  sendMessage,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.put("/updateProfilePic", updateProfilePic);
userRouter.get("/", searchUsers);
userRouter.get("/message/:id", getMessage);
userRouter.post("/message/:id", sendMessage);

export default userRouter;
