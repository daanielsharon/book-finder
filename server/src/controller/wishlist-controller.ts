import { NextFunction, Request, Response } from "express";
import { wishlistService } from "../service/wishlist-service";
import { JSON } from "../helper/response";
import { Code } from "../ts/enum/json";
import { ResponseError } from "../error/response-error";

class WishlistController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await wishlistService.create(request.body);
      JSON.send(response, Code.OK, result);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Create wishlist error", error.message);
      } else {
        console.error("Create wishlist error", error);
      }

      next(error);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    try {
      const uid = request.params.id;
      if (!uid) throw new ResponseError(Code.BAD_REQUEST, "id is required");
      const res = await wishlistService.getById(uid);
      JSON.send(response, Code.OK, res);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Get by id wishlist error", error.message);
      } else {
        console.error("Get by id wishlist error", error);
      }

      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const uid = request.params.id;
      if (!uid) throw new ResponseError(Code.BAD_REQUEST, "id is required");

      await wishlistService.delete(request.body, uid);
      JSON.send(response, Code.OK, null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Delete wishlist error", error.message);
      } else {
        console.error("Delete wishlist error", error);
      }

      next(error);
    }
  }
}

export const wishlistController = new WishlistController();
