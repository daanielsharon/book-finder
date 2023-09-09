import { Db, MongoClient } from "mongodb";
import { Connection } from "./ts/interface/connection";

export class Pool {
  uri: string | null;
  client: MongoClient | null;
  dbName: string | undefined;

  constructor(dbName: string | undefined) {
    this.uri = null;
    this.client = null;
    this.dbName = dbName;
  }

  public async connect({
    username,
    password,
    port,
  }: Connection): Promise<void> {
    this.uri = `mongodb://${username}:${password}@${
      process.env.ENV === "dev" ? "localhost" : "mongo"
    }:${port}`;
    this.client = new MongoClient(this.uri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 500,
    });

    await this.client.connect();
    await this.client.db(this.dbName).command({ ping: 1 });
  }

  public async close(): Promise<void> {
    await this.client?.close();
  }

  public query(): Db | undefined {
    return this.client?.db(this.dbName);
  }
}
