import Card from "../../components/card/Card";
import Home from "../../layouts/home/Home";
import finder from "./finder.module.css";
import data from "../../data/fake.json";
import { BookResponse } from "../../ts/book";

const Finder = () => {
  return (
    <Home>
      <div className={`${finder.content}`}>
        {data.data.map((item: BookResponse, index: number) => (
          <Card item={item} index={index} />
        ))}
      </div>
    </Home>
  );
};

export default Finder;
