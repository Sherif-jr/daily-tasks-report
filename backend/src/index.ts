import "dotenv/config";
import connectDB from "./db/connect";
import express from "express";
import cors from "cors";
import { monitorServer } from "./middleware/monitorServer";
import router from "./router";
import globalErrorHandler from "./middleware/globalErrorHandler";
import path from "path";

const app = express();

const port = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tasksReport";
console.log({ MONGO_URI });
console.log({ envMongoUrl: process.env.MONGO_URI });

connectDB(MONGO_URI)
  .then(() => {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));
    app.use(cors());
    app.use(monitorServer());
    app.use(express.json());
    app.use("/api/v1", router);
    app.use(globalErrorHandler);
    app.all("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
    });

    app.all("*", (req, res) => {
      res.status(404).json({ message: "Not found" });
    });

    const server = app.listen(port, () => {
      console.log("Server started on port", port);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
