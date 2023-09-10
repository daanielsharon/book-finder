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
      <img src={item.thumbnail.size.normal} />
      <div className={`${card.info}`}>
        <div>
          <h2 className={`${card.title}`}>{item.title} </h2>
          <p className={`${card.subtitle}`}>
            {item.authors?.slice(0, 3)?.join(", ")}
          </p>
        </div>
        <div>
          <p className={`${card.rating}`}>Rating:</p>
          <Rating value={item.rating} readOnly />
          <div className={`${card.wishlist}`}>
            <p className={`${card.wish}`}>Wishlist</p>
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
    </div>
  );
};

export default Card;
