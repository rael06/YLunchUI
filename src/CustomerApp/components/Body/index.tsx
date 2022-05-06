import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "../Login";
import Registration from "../Registration";
import Restaurants from "../Restaurants";
import RestaurantDetails from "../Restaurants/RestaurantCard/RestaurantDetails";
import Cart from "../Cart";
import Orders from "../Orders";

export default function Body() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="orders" element={<Orders />} />
        <Route path="cart" element={<Cart />} />
        <Route path="registration" element={<Registration />} />
        <Route
          path="restaurants/:restaurantId"
          element={<RestaurantDetails />}
        />
        <Route path="restaurants" element={<Restaurants />} />
      </Routes>
    </Box>
  );
}
