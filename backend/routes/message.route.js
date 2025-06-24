import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/:id", getMessage);
messageRouter.post("/:id", sendMessage);

export default messageRouter;
