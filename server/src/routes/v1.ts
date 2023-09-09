import { Router } from "express";
import { book } from "./book.ts";
import { wishlist } from "./wishlist.ts";

export const v1: Router = Router();
v1.use("/book", book);
v1.use("/wishlist", wishlist);
