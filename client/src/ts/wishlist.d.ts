import { Response } from "./response";

export interface WishlistCreateRequest {
  uid: string;
  bookId: string;
}

export interface WishlistDeleteRequest {}

export interface WishlistGetResponse extends Response {
  data: {
    id: string;
    title: string;
    authors: string[];
    rating?: number;
    thumbnail: {
      size: {
        small: string;
        normal: string;
      };
    };
  }[];
}

export interface WishlistCreateResponse extends Response {
  data: WishlistCreateRequest;
}
