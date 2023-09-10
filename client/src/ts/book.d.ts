import { Response } from "./response";

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
  isbn: {
    type: string;
    identifier: string;
  };
}

export interface BookResponse extends Response {
  data: Book[];
}
