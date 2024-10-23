import clc from "cli-color";
import mongoose from "mongoose";

//track retries to prevent infinite loop in case of error
let connected = false;
let retries = 0;
const retryIntervals = [5000, 10000, 20000, 50000, 100000]; // in milliseconds

const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);

    connected = true;
    console.log(clc.greenBright("MongoDB connected"));
    return;
  } catch (error) {
    console.error(clc.redBright("MongoDB connection error:"), error);

    // retry connection on error
    if (!connected) {
      if (retries < retryIntervals.length) {
        console.log(
          `MongoDB connection failed, retrying... Attempt ${retries + 1}`
        );
        setTimeout(connectDB, retryIntervals[retries]);
        retries++;
      } else {
        console.error("MongoDB connection failed after maximum retries.");
        throw new Error("MongoDB connection failed after multiple attempts.");
      }
    }
  }
};

export default connectDB;
