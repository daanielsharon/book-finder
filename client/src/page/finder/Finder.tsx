import Card from "../../components/card/Card";
import Home from "../../layouts/home/Home";
import finder from "./finder.module.css";

const Finder = () => {
  return (
    <Home>
      <div className={`${finder.content}`}>
        <Card />
        <Card />
        <Card />
      </div>
    </Home>
  );
};

export default Finder;
