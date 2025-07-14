import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import router from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectToMongoDB } from "./config/database.config.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import messageRouter from "./routes/message.route.js";
import { createMessage } from "./controllers/message.controller.js";
import { Message } from "./models/message.model.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-go-m.vercel.app"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3000;
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join_conversation", (conversationId) => {
    // console.log("Here i am", conversationId);
    socket.join(conversationId);
  });

  socket.on("user_online", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("update_online_users", Array.from(onlineUsers.keys()));
  });

  socket.on("disconnect", () => {
    for (let [userId, sockId] of onlineUsers) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit("update_online_users", Array.from(onlineUsers.keys()));
    console.log("Socket disconnected:", socket.id);
  });

  socket.on("send_message", async (data) => {
    try {
      console.log("Socket send_message data:", data);
      const { receiverId, content, userId } = data;

      const message = await createMessage({
        senderId: userId,
        receiverId,
        content,
      });

      // console.log(String(message.conversationId), "message.convId");

      io.to(String(message.conversationId)).emit("receive_message", message);
    } catch (err) {
      console.error("Socket send_message error:", err);
      socket.emit("error_message", { error: "Failed to send message" });
    }
  });

  socket.on("mark_as_seen", async ({ messageIds, userId, conversationId }) => {
    console.log("Marking as seen:", { messageIds, userId, conversationId });
    try {
      await Message.updateMany(
        { _id: { $in: messageIds }, seenBy: { $ne: userId } },
        {
          $addToSet: { seenBy: userId },
          $set: { status: "seen" },
        }
      ); 

      console.log("Sent here", conversationId)

      io.to(conversationId).emit("message_seen", {
        messageIds,
        userId,
        conversationId,
      });

    } catch (err) {
      console.error("Failed to mark messages as seen:", err);
    }
  });
});

app.use(
  cors({
    origin: ["http://localhost:5173", "https://chat-go-m.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.use("/api/auth", router);
app.use("/api/user", userRouter);
app.use("/api/messages", messageRouter);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
