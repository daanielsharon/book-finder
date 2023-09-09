import { Route, Routes } from "react-router";
import "./App.css";
import Finder from "./page/finder/Finder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Finder />} />
      <Route path="/wishlist" />
    </Routes>
  );
}

export default App;
