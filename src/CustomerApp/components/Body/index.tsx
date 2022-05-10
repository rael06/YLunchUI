import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import useCurrentUser from "../../../common/hooks/useCurrentUser";
import Cart from "../Cart";
import Login from "../Login";
import OrderDetails from "../OrderDetails";
import Orders from "../Orders";
import Registration from "../Registration";
import RestaurantDetails from "../RestaurantDetails";
import Restaurants from "../Restaurants";

export default function Body() {
  const { currentUser } = useCurrentUser();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        // height of header
        marginTop: "62px",
      }}
    >
      <Routes>
        <Route
          path="restaurants/:restaurantId"
          element={<RestaurantDetails />}
        />
        <Route path="restaurants" element={<Restaurants />} />

        <Route path="cart" element={<Cart />} />

        <Route
          path="orders/:orderId"
          element={currentUser ? <OrderDetails /> : <Restaurants />}
        />
        <Route
          path="orders"
          element={currentUser ? <Orders /> : <Restaurants />}
        />

        <Route
          path="registration"
          element={currentUser ? <Registration /> : <Restaurants />}
        />

        <Route path="login" element={<Login />} />
      </Routes>
    </Box>
  );
}
