import { PropsWithChildren } from "react";
// import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import home from "./home.module.css";

const Home = ({ children }: PropsWithChildren) => {
  return (
    <div className={`${home.view}`}>
      <Navbar key={1} />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
