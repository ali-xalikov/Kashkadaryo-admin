import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { AddShopPage } from "./pages/AddShopPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/add-shop" element={<AddShopPage />} />
    </Routes>
  );
}
