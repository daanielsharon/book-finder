import card from "./card.module.css";
// import reactsvg from "../../assets/react.svg";
import { Rating, Switch } from "@mui/material";
import { useState } from "react";
import { Book, BookResponse } from "../../ts/book";
import service from "../../service";

interface Card {
  item: Book;
  uid: string;
  defaultChecked: boolean;
  setData: (value: (prevVar: BookResponse | null) => BookResponse) => void;
}

const Card = ({ item, uid, defaultChecked }: Card) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const handleAddWishlist = async (value: boolean) => {
    try {
      const response = await service.wishlist.add({ uid, bookId: item.id });
      if (response) {
        setChecked(value);
      }
    } catch (error) {
      console.error("error adding wishlist", error);
    }
  };

  return (
    <div className={`${card.card}`}>
      <img src={item.thumbnail.size.normal} className={`${card.image}`} />
      <div className={`${card.info}`}>
        <p>Title: {item.title} </p>
        <p>Author: {item.authors.slice(0, 3).join(", ")}</p>
        <div>
          <p>Rating:</p>
          <Rating value={item.rating} readOnly />
        </div>
        <div className={`${card.wishlist}`}>
          <p>Wishlist</p>
          <Switch
            checked={checked}
            onChange={(_, newValue) => {
              handleAddWishlist(newValue);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
