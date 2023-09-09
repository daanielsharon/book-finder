import { Request } from "express";
import { validate } from "../validation/validation";
import { WishlistValidation } from "../validation/wishlist";
import { WebDelete, WebSave } from "../ts/interface/wishlist";
import { bookService } from "./book-service";
import { ResponseError } from "../error/response-error";
import { Code } from "../ts/enum/json";
import { wishlistRepo } from "../repository/wishlist-repo";

class WishlistService {
  async create(request: Request): Promise<WebSave> {
    const result: WebSave = validate(WishlistValidation.save, request);

    const response = await bookService.get(result.bookId);
    if (!response)
      throw new ResponseError(Code.NOT_FOUND, "book does not exist");

    const duplicate = await wishlistRepo.get(result);
    if (duplicate)
      throw new ResponseError(
        Code.BAD_REQUEST,
        "wishlist has already been saved!"
      );

    await wishlistRepo.save(result);

    return result;
  }

  async getById(uid: string) {
    const response = await wishlistRepo.getById(uid);

    if (response) {
      if (response.length == 0)
        throw new ResponseError(Code.NOT_FOUND, "no such user id");

      const newRes = await Promise.all(
        response.map(async (res) => {
          const data = await bookService.get(res.bookId);
          return data;
        })
      );

      return newRes;
    }

    throw new ResponseError(Code.NOT_FOUND, "no such data");
  }

  async delete(request: Request, uid: string): Promise<void> {
    const result: WebDelete = validate(WishlistValidation.delete, request);

    const exist = wishlistRepo.get({ uid, bookId: result.bookId });
    if (!exist)
      throw new ResponseError(Code.BAD_REQUEST, "no such wishlist available");

    await wishlistRepo.delete({ uid, bookId: result.bookId });
  }
}

export const wishlistService = new WishlistService();
