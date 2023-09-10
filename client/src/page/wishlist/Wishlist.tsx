import Home from "../../layouts/home/Home";
import data from "../../data/fake.json";
import useIdentity from "../../hooks/useIdentity";
import { Book } from "../../ts/book";
import Card from "../../components/card/Card";
import wishlist from "./wishlist.module.css";
import { useState } from "react";

const Wishlist = () => {
  const uid = useIdentity();
  const [fakeData, setFakeData] = useState(data);

  return (
    <Home>
      <div className={`${wishlist.content}`}>
        <div className={`${wishlist.card}`}>
          {fakeData.data.map((item: Book, index: number) => (
            <Card
              key={index}
              item={item}
              uid={uid}
              defaultChecked={true}
              setData={setFakeData}
            />
          ))}
        </div>
      </div>
    </Home>
  );
};

export default Wishlist;
