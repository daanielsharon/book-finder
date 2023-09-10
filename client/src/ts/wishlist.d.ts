import { BookResponse } from "./book";
import { Response } from "./response";

export interface WishlistCreateRequest {
  uid: string;
  title: string;
  bookId: string;
}

export interface WishlistDeleteRequest {}

export interface WishlistGetResponse extends Response, BookResponse {}

export interface WishlistCreateResponse extends Response {
  data: WishlistCreateRequest;
}
