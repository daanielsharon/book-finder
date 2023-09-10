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

    const response = await bookService.get(result.title);
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
      if (response.length == 0) return null;

      const newRes = await Promise.all(
        response.map(async (res) => {
          const data = await bookService.get(res.bookId);
          if (data && data.length > 0) return data[0];
          return null;
        })
      );

      return newRes.filter((item) => item !== null);
    }

    throw new ResponseError(Code.NOT_FOUND, "no such data");
  }

  async delete(request: WebDelete): Promise<void> {
    const exist = wishlistRepo.get({
      uid: request.uid,
      title: request.title,
      bookId: request.bookId,
    });
    if (!exist)
      throw new ResponseError(Code.BAD_REQUEST, "no such wishlist available");

    await wishlistRepo.delete({
      uid: request.uid,
      title: request.title,
      bookId: request.bookId,
    });
  }
}

export const wishlistService = new WishlistService();
