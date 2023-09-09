import { http } from "./config";

export class Api<T> {
  public async get(url: string): Promise<T> {
    const response = await http.get(url);
    return response.data as T;
  }

  public async post(url: string, data: unknown): Promise<T> {
    const response = await http.post(url, data);
    return response.data as T;
  }

  public async put(url: string, data: unknown): Promise<T> {
    const response = await http.put(url, data);
    return response.data as T;
  }

  public async patch(url: string, data: unknown): Promise<T> {
    const response = await http.patch(url, data);
    return response.data as T;
  }

  public async delete(url: string): Promise<void> {
    await http.delete(url);
  }
}
