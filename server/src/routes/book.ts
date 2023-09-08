import { Router } from "express";
import { bookController } from "../controller/book-controller.ts";

export const book: Router = Router();
book.get("/", bookController.get);
