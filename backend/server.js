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

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join_conversation", (receiverId) => {
    socket.join(receiverId);
  });

  socket.on("send_message", async (data, callback) => {
    try {
      console.log("Socket send_message data:", data);
      const { receiverId, content, userId } = data;

      const message = await createMessage({
        senderId: userId,
        receiverId,
        content,
      });

      io.to(receiverId).emit("receive_message", {
        _id: message._id,
        sender: message.sender,
        receiver: message.receiver,
        content: message.content,
        conversationId: message.conversationId,
        timestamp: message.timestamp,
      });
      callback({ success: true, message });
    } catch (err) {
      console.error("Socket send_message error:", err);
      socket.emit("error_message", { error: "Failed to send message" });
    }
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

app.use(
  cors({
    origin: "http://localhost:5173",
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
