import express from "express";
import { getMessage, sendMessage, getMessageById } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/:id", getMessage);
messageRouter.post("/:id", sendMessage);
messageRouter.get("/message/:id", getMessageById);

export default messageRouter;
