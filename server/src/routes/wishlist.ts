import { Router } from "express";
import { wishlistController } from "../controller/wishlist-controller";

export const wishlist: Router = Router();
wishlist.post("/", wishlistController.create);
wishlist
  .route("/:id")
  .get(wishlistController.getById)
  .delete(wishlistController.delete);
