import card from "./card.module.css";
// import reactsvg from "../../assets/react.svg";
import { CircularProgress, Rating, Switch } from "@mui/material";
import { useState } from "react";
import service from "../../service";
import { Book } from "../../ts/book";

interface Card {
  item: Book;
  uid: string;
  defaultChecked: boolean;
  setData?: (value: (prevVar: Book[] | null) => Book[] | null) => void;
}

const Card = ({ item, uid, defaultChecked, setData }: Card) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddWishlist = async (value: boolean) => {
    try {
      setIsLoading(true);
      const response = await service.wishlist.add({
        uid,
        title: item.title,
        bookId: item.id,
      });
      if (response) {
        setChecked(value);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("error adding wishlist", error);
    }
  };

  const handleRemoveWishlist = async () => {
    try {
      setIsLoading(true);
      await service.wishlist.remove(uid, item.id, item.title);
      setChecked(false);
      setIsLoading(false);
      setData &&
        setData((prev) => {
          if (prev) {
            return prev.filter((data) => data.id !== item.id);
          }
          return null;
        });
    } catch (error) {
      console.error("error removing wishlist", error);
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
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Switch
              checked={checked}
              onChange={(_, newValue) => {
                return checked
                  ? handleRemoveWishlist()
                  : handleAddWishlist(newValue);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
