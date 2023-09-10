import { Route, Routes } from "react-router";
import "./App.css";
import Finder from "./page/finder/Finder";
import Wishlist from "./page/wishlist/Wishlist";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Finder />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
}

export default App;
