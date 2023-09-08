import { ErrorRequestHandler } from "express";
import { ResponseError } from "../error/response-error.ts";
import { JSON } from "../helper/response.ts";
import { Code } from "../ts/enum/json.ts";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    JSON.send(res, err.status as Code, { error: err.message });
  }
};
