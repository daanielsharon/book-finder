import { KeyboardEvent, useEffect, useRef, useState } from "react";
import Card from "../../components/card/Card";
// import data from "../../data/fake.json";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { AxiosError } from "axios";
import useIdentity from "../../hooks/useIdentity";
import Home from "../../layouts/home/Home";
import service from "../../service";
import { Book } from "../../ts/book";
import finder from "./finder.module.css";

const Finder = () => {
  const uid = useIdentity();
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<Book[] | null>(null);
  const [wishListData, setWishListData] = useState<Book[] | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: "",
  });

  useEffect(() => {
    inputRef.current?.focus();
    (async function () {
      const res = await service.wishlist.get(uid);
      setWishListData(res.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (input: string | undefined) => {
    if (input) {
      try {
        const response = await service.book.get(input);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          setIsLoading(false);
          console.error(error.message);
          setError({ status: true, message: error.message });
          return;
        }

        setIsLoading(false);
        console.error(error);
        setError({ status: true, message: "something went wrong" });
      }
    }
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toLowerCase() === "enter" && !loading) {
      setIsLoading(true);
      const input = inputRef.current?.value;
      await handleSearch(input);
    }
  };

  const handleClick = async () => {
    const input = inputRef.current?.value;
    await handleSearch(input);
  };

  return (
    <Home>
      <div className={`${finder.content}`}>
        <div className={`${finder.input} field has-addons`}>
          <div className={`${finder.search} control`}>
            <input
              ref={inputRef}
              className={`input`}
              type="text"
              placeholder="Hit enter or button to search"
              onKeyDown={handleKeyDown}
            />
          </div>
          {loading ? (
            <div>
              <CircularProgress className={`${finder.loading}`} />
            </div>
          ) : (
            <div className="control">
              <a className="button is-info" onClick={handleClick}>
                Search
              </a>
            </div>
          )}
        </div>
        <div className={`${finder.card}`}>
          {data &&
            data.map((item: Book, index: number) => (
              <Card
                key={index}
                item={item}
                uid={uid}
                defaultChecked={
                  wishListData
                    ? wishListData.filter((wishList) => wishList.id === item.id)
                        .length > 0
                      ? true
                      : false
                    : false
                }
              />
            ))}
        </div>
        <Snackbar
          open={error.status}
          autoHideDuration={6000}
          onClose={() => setError({ status: false, message: "" })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setError({ status: false, message: "" })}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error.message}
          </Alert>
        </Snackbar>
      </div>
    </Home>
  );
};

export default Finder;
