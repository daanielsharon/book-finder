import navbar from "./navbar.module.css";
import reactImg from "../../assets/react.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className={`${navbar.top} navbar ${navbar.center}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div>
        <a className="navbar-item">
          <img src={reactImg} width="112" height="28" />
        </a>
      </div>

      <div>
        <div className={`${navbar.menu}`}>
          <Link className="navbar-item" to={"/"}>
            Home
          </Link>

          <Link className="navbar-item" to={"/wishlist"}>
            Wishlist
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
