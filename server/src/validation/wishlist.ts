import Joi from "joi";

export class WishlistValidation {
  static save = Joi.object({
    uid: Joi.string().uuid().required(),
    bookId: Joi.string().min(1).required(),
  });
}
