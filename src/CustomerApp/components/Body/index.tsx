import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Cart from "../Cart";
import Login from "../Login";
import Orders from "../Orders";
import Registration from "../Registration";
import Restaurants from "../Restaurants";
import RestaurantDetails from "../Restaurants/RestaurantCard/RestaurantDetails";

export default function Body() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        marginTop: "60px",
      }}
    >
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
