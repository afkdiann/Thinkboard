import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if(!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("Error connecting to MONGODB:", error);
    process.exit(1);
  }
};
