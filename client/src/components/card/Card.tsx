import card from "./card.module.css";
import reactsvg from "../../assets/react.svg";

const Card = () => {
  return (
    <div className={`${card.card}`}>
      <img src={reactsvg} />
      <p>Author:</p>
      <p>Title: </p>
    </div>
  );
};

export default Card;
