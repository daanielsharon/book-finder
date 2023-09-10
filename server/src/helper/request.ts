import "dotenv/config";

export class HTTPS<T> {
  async get(query: string): Promise<T | undefined> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.API_KEY}`,
        { method: "GET" }
      );

      const json = await response.json();
      return json as T;
    } catch (error) {
      if (error instanceof Error) {
        console.log("error", error.message);
      } else {
        console.error("error", error);
      }
    }
  }
}
