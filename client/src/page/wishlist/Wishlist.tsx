import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
// import data from "../../data/fake.json";
import useIdentity from "../../hooks/useIdentity";
import Home from "../../layouts/home/Home";
import { Book, BookResponse } from "../../ts/book";
import wishlist from "./wishlist.module.css";
import service from "../../service";

const Wishlist = () => {
  const uid = useIdentity();
  const [data, setData] = useState<BookResponse | null>(null);

  useEffect(() => {
    (async function () {
      const res = await service.wishlist.get(uid);
      setData(res);
    })();
  }, [uid]);

  return (
    <Home>
      <div className={`${wishlist.content}`}>
        <div className={`${wishlist.card}`}>
          {data?.data &&
            data.data.map((item: Book, index: number) => (
              <Card
                key={index}
                item={item}
                uid={uid}
                defaultChecked={true}
                setData={setData}
              />
            ))}
        </div>
      </div>
    </Home>
  );
};

export default Wishlist;
