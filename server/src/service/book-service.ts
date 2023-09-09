import { ResponseError } from "../error/response-error";
import { HTTPS } from "../helper/request";
import { Code } from "../ts/enum/json";
import { BookResponse } from "../ts/interface/book";
class BookService {
  async get(query: string) {
    const response = await new HTTPS<BookResponse>().get(query);

    if (!response)
      throw new ResponseError(
        Code.SERVICE_UNAVAILABLE,
        "no response from google-book"
      );

    return response.items?.map((item) => ({
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
