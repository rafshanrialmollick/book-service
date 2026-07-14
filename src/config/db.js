import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://localhost:27017/book-services";
    await mongoose.connect(mongoUri);
    logger.info(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    logger.error({ err: error }, "MongoDB connection failed");
    throw error;
  }
};

export default connectDB;
