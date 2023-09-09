import { NextFunction, Request, Response } from "express";
import { bookService } from "../service/book-service";
import { JSON } from "../helper/response";
import { Code } from "../ts/enum/json";
import { ResponseError } from "../error/response-error";

class BookController {
  async get(request: Request, response: Response, next: NextFunction) {
    try {
      const { q } = request.query;
      if (!q) throw new ResponseError(Code.BAD_REQUEST, "query param required");
      const res = await bookService.get(q as string);
      JSON.send(response, Code.OK, res);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error while getting book", error.message);
      } else {
        console.error("Error while getting book", error);
      }

      next(error);
    }
  }
}

export const bookController = new BookController();
