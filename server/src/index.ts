import { app } from "./app/web.ts";
import { Pool } from "./pool.ts";
import "dotenv/config";

const port: number = 8080;

export const pool = new Pool(process.env.MONGO_DATABASE);
pool
  .connect({
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    port: process.env.MONGO_PORT,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error(`error while starting... ${error.message}`);
  });
