import { ResponseError } from "../error/response-error.ts";
import { pool } from "../index.ts";
import { Code } from "../ts/enum/json.ts";
import { DomainSave } from "../ts/interface/wishlist.ts";

class WishlistRepo {
  async save({ uid, bookId }: DomainSave) {
    try {
      const res = await pool
        .query()
        ?.collection<DomainSave>("wishlist")
        .insertOne({
          uid,
          bookId,
        });

      return res;
    } catch (error) {
      console.error("save wishlist error", error);
      if (error instanceof Error) {
        throw new ResponseError(Code.INTERNAL_SERVER_ERROR, error.message);
      }
    }
  }
}

export const wishlistRepo = new WishlistRepo();
