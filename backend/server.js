import express from "express";
import cors from "cors";
import router from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectToMongoDB } from "./config/database.config.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }
));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.use("/api/auth", router);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
