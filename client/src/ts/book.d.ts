import { Response } from "./response";

export interface BookResponse extends Response {
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

export interface Book {
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
}
