import { User } from "../models/user.model.js";
import { Conversation } from "../models/conversation.model.js";
import cloudinary from "../config/cloudinary.config.js";
import jwt from "jsonwebtoken";

export const updateProfilePic = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const userId = jwt.verify(token, process.env.JWT_SECRET).userId;

  try {
    const profilePic = req.files && req.files.file ? req.files.file : null;
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
    const users = await User.find({
      $or: [
        { username: { $regex: `^${query}`, $options: "i" } },
        { firstName: { $regex: `^${query}`, $options: "i" } },
        { lastName: { $regex: `^${query}`, $options: "i" } },
        // I need to have search by full name here
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstName", " ", "$lastName"] },
              regex: `^${query}`,
              options: "i",
            },
          },
        },
      ],

      is_verified: true,
    })
      .limit(20)
      .select("firstName lastName username email profilePic is_online");

    // console.log(users, "users");

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

export const getUserConversation = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const userId = jwt.verify(token, process.env.JWT_SECRET).userId;

  try {
    const conversations = await Conversation.find({
      members: { $in: [userId] },
      isGroup: false,
    })
      .populate("members", "firstName lastName username bio email profilePic is_online")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      message: "Conversations fetched successfully",
      conversations,
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching conversations" });
  }
};
