import clc from "cli-color";
import { RequestHandler } from "express";
export const monitorServer = (): RequestHandler => (req, res, next) => {
  let method;
  switch (req.method) {
    case "GET":
      method = clc.green(req.method);
      break;
    case "POST":
      method = clc.yellowBright(req.method);
      break;
    case "PATCH":
      method = clc.magenta(req.method);
      break;
    case "DELETE":
      method = clc.red(req.method);
      break;
    case "PUT":
      method = clc.cyan(req.method);
      break;

    case "OPTIONS":
      method = clc.blue(req.method);
      break;

    case "HEAD":
      method = clc.cyan(req.method);

    default:
      break;
  }
  console.log(method, clc.yellow(req.url));
  next();
};
