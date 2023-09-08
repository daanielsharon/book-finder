import { Router } from "express";
import { book } from "./book.ts";

export const v1: Router = Router();
v1.use("/book", book);
