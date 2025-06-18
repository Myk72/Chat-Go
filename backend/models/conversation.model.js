import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    isGroup: { type: Boolean, default: false },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChatUser" }],
    groupName: { type: String },
    groupAvatar: { type: String },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
