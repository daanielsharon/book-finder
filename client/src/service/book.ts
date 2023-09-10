import { Api } from "../api/api";
import { BookResponse } from "../ts/book";

const get = async (q: string): Promise<BookResponse> => {
  const url = `/book?q=${q}`;
  const response = await new Api<BookResponse>().get(url);
  return response;
};

export default { get };
