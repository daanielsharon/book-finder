import card from "./card.module.css";
// import reactsvg from "../../assets/react.svg";
import { BookResponse } from "../../ts/book";
import { Rating, Switch } from "@mui/material";
import { useState } from "react";

const Card = ({ item, index }: { item: BookResponse; index: number }) => {
  const [checked] = useState<boolean>(false);
  return (
    <div key={index} className={`${card.card}`}>
      <img src={item.thumbnail.size.normal} />
      <div className={`${card.info}`}>
        <p>Title: {item.title} </p>
        <div>
          <p>Author:</p>
          <ul className={`${card.author}`}>
            {item.authors.slice(0, 3).map((author, index) => (
              <li key={index}>{author}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>Rating:</p>
          <Rating value={item.rating} readOnly />
        </div>
        <div>
          <p>Wishlist</p>
          <Switch checked={checked} />
        </div>
      </div>
    </div>
  );
};

export default Card;
