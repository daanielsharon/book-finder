import express from "express";
import { v1 } from "../routes/v1";
import { errorMiddleware } from "../middleware/error-middleware";

export const app: express.Application = express();
app.use(express.json());
app.use("/api/v1/", v1);

app.use(errorMiddleware);
