import { ErrorRequestHandler } from "express";

type ResErr = {
  message: string | string[];
  error?: any;
};
const globalErrorHandler: ErrorRequestHandler<never, ResErr> = (
  error,
  req,
  res,
  next
): any => {
  if (error) {
    if (error.statusCode == 400 && "body" in error)
      return res.status(400).json({ message: "req JSON maybe incorrect" });

    if (error.name == "ValidationError")
      return res.status(404).json({ message: error.message });

    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export default globalErrorHandler;
