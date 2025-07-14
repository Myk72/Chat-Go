import { io } from "socket.io-client";

export const socket = io("https://chat-go-n43g.onrender.com", {
  reconnectionAttempts: 5,
  withCredentials: true,
});
