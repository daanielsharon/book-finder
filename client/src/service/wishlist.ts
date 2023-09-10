import { Api } from "../api/api";
import {
  WishlistCreateRequest,
  WishlistCreateResponse,
  WishlistGetResponse,
} from "../ts/wishlist";

const add = async ({
  uid,
  title,
  bookId,
}: WishlistCreateRequest): Promise<WishlistCreateResponse> => {
  const url = "/wishlist";
  const data = {
    uid,
    title,
    bookId,
  };

  const response = await new Api<WishlistCreateResponse>().post(url, data);
  return response;
};

const get = async (uid: string): Promise<WishlistGetResponse> => {
  const url = `/wishlist/${uid}`;
  const response = await new Api<WishlistGetResponse>().get(url);
  return response;
};

const remove = async (
  uid: string,
  bookId: string,
  title: string
): Promise<void> => {
  const url = `/wishlist/${uid}?bookId=${bookId}&title=${title}`;
  await new Api<WishlistGetResponse>().delete(url);
};

export default {
  add,
  get,
  remove,
};
