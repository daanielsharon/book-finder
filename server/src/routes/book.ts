import { Router } from "express";
import { bookController } from "../controller/book-controller";

export const book: Router = Router();
book.get("/", bookController.get);
