import { RequestHandler } from "express";

export default function tryCatch<
  ReqBody,
  Params = never,
  ReqQuery = never,
  ResBody = { message: string; data?: any }
>(fun: RequestHandler<Params, ResBody, ReqBody, ReqQuery>) {
  const tryCatchFun: RequestHandler<
    Params,
    ResBody,
    ReqBody,
    ReqQuery
  > = async (req, res, next) => {
    try {
      await fun(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return tryCatchFun;
}
