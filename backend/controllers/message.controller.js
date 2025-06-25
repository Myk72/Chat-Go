import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";
import jwt from "jsonwebtoken";

export const getMessage = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: id },
        { sender: id, receiver: userId },
      ],
    })
      .populate("sender", "username profilePic")
      .populate("receiver", "username profilePic")
      .sort({ timestamp: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching messages" });
  }
};

export const sendMessage = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const { content } = req.body;
    const { id: receiverId } = req.params;

    if (!receiverId || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    let conversation = await Conversation.findOne({
      isGroup: false,
      members: { $all: [userId, receiverId], $size: 2 },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [userId, receiverId],
      });
    }

    const message = await Message.create({
      sender: userId,
      receiver: receiverId,
      content,
      conversationId: conversation._id,
      seenBy: [userId],
      status: "sent",
    });

    conversation.lastMessage = message._id;
    await conversation.save();

    res.status(201).json({ success: true, message });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
};

export const getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findById(id)
      .populate("sender", "username profilePic")
      .populate("receiver", "username profilePic");

    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    res.status(200).json({ success: true, message });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ success: false, message: "Error fetching message" });
  }
};
