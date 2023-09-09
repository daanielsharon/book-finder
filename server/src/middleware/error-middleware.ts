import { ErrorRequestHandler } from "express";
import { ResponseError } from "../error/response-error";
import { JSON } from "../helper/response";
import { Code } from "../ts/enum/json";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    JSON.send(res, err.status as Code, { error: err.message });
    return;
  }

  JSON.send(res, Code.INTERNAL_SERVER_ERROR, null);
};
