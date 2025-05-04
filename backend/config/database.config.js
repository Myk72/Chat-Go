import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  const mongodb_url = process.env.MONGODB_URL;
  await mongoose
    .connect(mongodb_url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};
