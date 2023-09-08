import { Response } from "express";
import { Code } from "../ts/enum/json.ts";

export class JSON {
  private static statusToCode: {
    [key: number]: string;
  } = {
    200: "OK",
    400: "Bad Request",
    404: "Not Found",
    500: "Internal Server Error",
  };

  static send(res: Response, code: Code, data: any) {
    res.status(code).json({
      code,
      status: this.statusToCode[code],
      data: data ? data : null,
    });
  }
}
