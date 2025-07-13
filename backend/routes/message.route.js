import express from "express";
import { getMessage, getMessageById, createMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/:id", getMessage);
messageRouter.post("/:id", createMessage);
messageRouter.get("/message/:id", getMessageById);

export default messageRouter;
