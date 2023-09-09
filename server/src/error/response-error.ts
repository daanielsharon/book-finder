import { Code } from "../ts/enum/json";

export class ResponseError extends Error {
  public status: Code | null;
  constructor(status: Code, message: string) {
    super(message);
    this.status = status;
  }
}
