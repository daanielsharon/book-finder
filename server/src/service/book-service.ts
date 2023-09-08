import { ResponseError } from "../error/response-error.ts";
import { HTTPS } from "../helper/request.ts";
import { Code } from "../ts/enum/json.ts";
import { BookResponse } from "../ts/interface/book.ts";
class BookService {
  async get(query: string) {
    const response: BookResponse = await new HTTPS<BookResponse>().get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );

    if (!response)
      throw new ResponseError(Code.NOT_FOUND, "no response from google-book");

    return response.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      rating: item.volumeInfo.averageRating,
      thumbnail: {
        size: {
          small: item.volumeInfo.imageLinks.smallThumbnail,
          normal: item.volumeInfo.imageLinks.thumbnail,
        },
      },
    }));
  }
}

export const bookService = new BookService();
