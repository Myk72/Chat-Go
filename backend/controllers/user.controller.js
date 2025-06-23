import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import cloudinary from "../config/cloudinary.config.js";
export const updateProfilePic = async (req, res) => {
  const userId = req.userId;
  try {
    if (!req.files || !req.files.profilePic) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const profilePic = req.files.profilePic;
    console.log(profilePic);
    if (profilePic) {
      const uploadedResponse = await cloudinary.uploader.upload(
        profilePic.tempFilePath
      );
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadedResponse.secure_url },
        { new: true }
      );
      if (updatedUser) {
        res.status(200).json({
          success: true,
          message: "Profile picture updated successfully",
          user: updatedUser,
        });
      } else {
        res.status(404).json({ success: false, message: "Error occured" });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating user" });
  }
};

export const searchUsers = async (req, res) => {
  const query = req.query.q || "";

  try {
    const users = await User.find(
      { $text: { $search: query }, is_verified: true },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(20)
      .select("firstName lastName username email profilePic is_online");

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};

export const getMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.userId, receiver: id },
        { sender: id, receiver: req.userId },
      ],
    })
      .populate("sender", "name profilePic")
      .populate("receiver", "name profilePic");

    if (messages) {
      res.status(200).json({
        success: true,
        message: "Messages fetched successfully",
        messages: messages,
      });
    } else {
      res.status(404).json({ success: false, message: "No messages found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching messages" });
  }
};

export const sendMessage = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (req.files && req.files.file) {
    const file = req.files.file;
    const uploadedResponse = await cloudinary.uploader.upload(
      file.tempFilePath
    );
    content = uploadedResponse.secure_url;
  }

  try {
    const message = await Message.create({
      sender: req.userId,
      receiver: id,
      content: content,
    });
    if (message) {
      res.status(200).json({
        success: true,
        message: "Message sent successfully",
        message: message,
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Error sending message" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending message" });
  }
};
