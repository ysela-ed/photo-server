import express from "express";
import mongoose from "mongoose";
import { config } from "./config.js";
import { router } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use("/api", router);

export const start = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/photo-service", {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    if (process.env.NODE_ENV !== "production") {
      console.info("Connected to MongoDB");
    }

    app.listen(config.port, () => {
      if (process.env.NODE_ENV !== "production") {
        console.info(`Server running on port ${config.port}`);
      }
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

export const stop = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
};

export { app };
