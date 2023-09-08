import fetch from "node-fetch";

export class HTTPS<T> {
  async get(url: string): Promise<T> {
    const response = await fetch(url, { method: "GET" });
    const json = response.json();
    return json as T;
  }
}
