import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
// import data from "../../data/fake.json";
import { Typography } from "@mui/material";
import useIdentity from "../../hooks/useIdentity";
import Home from "../../layouts/home/Home";
import service from "../../service";
import { Book } from "../../ts/book";
import wishlist from "./wishlist.module.css";

const Wishlist = () => {
  const uid = useIdentity();
  const [data, setData] = useState<Book[] | null>(null);

  useEffect(() => {
    (async function () {
      const res = await service.wishlist.get(uid);
      setData(res.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Home>
      <div className={`${wishlist.content}`}>
        <div className={`${wishlist.card}`}>
          {data ? (
            data.length > 0 ? (
              data.map((item: Book, index: number) => (
                <Card
                  key={index}
                  item={item}
                  uid={uid}
                  defaultChecked={true}
                  setData={setData}
                />
              ))
            ) : (
              <div className={`${wishlist.text}`}>
                <Typography>No wishlist found</Typography>
              </div>
            )
          ) : (
            <div className={`${wishlist.text}`}>
              <Typography>No wishlist found</Typography>
            </div>
          )}
        </div>
      </div>
    </Home>
  );
};

export default Wishlist;
