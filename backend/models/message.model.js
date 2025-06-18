import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatUser",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatUser",
      required: true,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChatUser" }],
    status: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent",
    },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
