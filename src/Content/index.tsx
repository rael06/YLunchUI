import { Navigate, Route, Routes } from "react-router-dom";
import CustomerApp from "../CustomerApp";
import Login from "../Login";
import NotFoundPage from "../NotFoundPage";
import RestaurantApp from "../RestaurantApp";
import classes from "./styles.module.scss";

export default function App() {
  return (
    <div className={classes.wrapper}>
      <Routes>
        <Route path="/customer/*" element={<CustomerApp />} />
        <Route
          path="/restaurant-administration/*"
          element={<RestaurantApp />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/customer" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
