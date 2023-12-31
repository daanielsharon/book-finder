import { ResponseError } from "../error/response-error";
import { pool } from "../index";
import { Collection } from "../ts/enum/collection";
import { Code } from "../ts/enum/json";
import { DomainDelete, DomainGet, DomainSave } from "../ts/interface/wishlist";

class WishlistRepo {
  async save({ uid, title, bookId }: DomainSave) {
    try {
      const res = await pool
        .query()
        ?.collection<DomainSave>(Collection.WISHLIST)
        .insertOne({
          uid,
          title,
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

  async get({ uid, title, bookId }: DomainGet) {
    try {
      const res = await pool
        .query()
        ?.collection<DomainGet>(Collection.WISHLIST)
        .findOne({
          uid,
          title,
          bookId,
        });

      return res;
    } catch (error) {
      console.error("get wishlist error", error);
      if (error instanceof Error) {
        throw new ResponseError(Code.INTERNAL_SERVER_ERROR, error.message);
      }
    }
  }

  async getById(uid: string) {
    try {
      const res = await pool
        .query()
        ?.collection<DomainGet>(Collection.WISHLIST)
        .find({
          uid,
        })
        .toArray();

      return res;
    } catch (error) {
      console.error("get by id wishlist error", error);
      if (error instanceof Error) {
        throw new ResponseError(Code.INTERNAL_SERVER_ERROR, error.message);
      }
    }
  }

  async delete({ uid, title, bookId }: DomainDelete) {
    try {
      await pool.query()?.collection(Collection.WISHLIST).deleteOne({
        uid,
        title,
        bookId,
      });
    } catch (error) {
      console.error("delete wishlist error", error);
      if (error instanceof Error) {
        throw new ResponseError(Code.INTERNAL_SERVER_ERROR, error.message);
      }
    }
  }
}

export const wishlistRepo = new WishlistRepo();
