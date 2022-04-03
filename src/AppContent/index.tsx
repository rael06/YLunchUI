import { Navigate, Route, Routes } from "react-router-dom";
import CustomerApp from "../CustomerApp";
import NotFoundPage from "../common/NotFoundPage";
import RestaurantApp from "../RestaurantApp";

export default function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/customer/*" element={<CustomerApp />} />
        <Route
          path="/restaurant-administration/*"
          element={<RestaurantApp />}
        />
        <Route path="/" element={<Navigate to="/customer/restaurants" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
