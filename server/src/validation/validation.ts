import { Request } from "express";
import Joi from "joi";
import { ResponseError } from "../error/response-error.ts";
import { Code } from "../ts/enum/json.ts";

export const validate = (schema: Joi.ObjectSchema<any>, request: Request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error)
    throw new ResponseError(Code.BAD_REQUEST, result.error.message);

  return result.value;
};
