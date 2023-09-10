import express from "express";
import { v1 } from "../routes/v1";
import { errorMiddleware } from "../middleware/error-middleware";
import cors from "cors";

export const app: express.Application = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use("/api/v1/", v1);

app.use(errorMiddleware);
