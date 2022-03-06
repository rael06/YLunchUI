import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CustomerApp from "./CustomerApp";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import RestaurantApp from "./RestaurantApp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="customer" element={<CustomerApp />} />
        <Route path="restaurant-administration" element={<RestaurantApp />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/customer" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
