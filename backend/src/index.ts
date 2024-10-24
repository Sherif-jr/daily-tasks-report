import connectDB from "./db/connect";
import express from "express";
import cors from "cors";
import { monitorServer } from "./middleware/monitorServer";
import router from "./router";
import globalErrorHandler from "./middleware/globalErrorHandler";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tasksReport";
connectDB(MONGO_URI)
  .then(() => {
    app.use(cors());
    app.use(monitorServer());
    app.use(express.json());
    app.use("/api/v1", router);
    app.use(globalErrorHandler);
    app.all("/", (req, res) => {
      res.send("Hello World!");
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
