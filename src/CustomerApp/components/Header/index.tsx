import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GoBackButton } from "../../../common/components/GoBackButton";
import useCurrentUser from "../../../common/hooks/useCurrentUser";
import { getCurrentUserApi } from "../../../common/services/api/authentication";
import { getLocalStorageItem } from "../../../common/services/localStorage";
import { CartContext } from "../../contexts/CartContext";
import LoggedInSection from "./components/LoggedInSection";
import LoggedOutSection from "./components/LoggedOutSection";
import logo from "./ylunch-logo.png";
import classes from "./style.module.scss";

export default function Header() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { cart } = React.useContext(CartContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      getLocalStorageItem("accessToken") &&
      getLocalStorageItem("refreshToken")
    ) {
      getCurrentUserApi().then((res) => {
        setCurrentUser(res);
      });
    }
  }, [setCurrentUser]);

  return (
    <Box
      sx={{
        boxShadow: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        background: "white",
        width: "100%",
        zIndex: 1,
      }}
      component={"header"}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button onClick={() => navigate("restaurants")}>
          <Box
            component={"img"}
            sx={{ height: "50px" }}
            src={logo}
            alt="Logo Ylunch"
          />
        </Button>
        <GoBackButton />
      </Box>

      <Box sx={{ display: "flex" }}>
        <Button sx={{ marginRight: 1 }} onClick={() => navigate("restaurants")}>
          Restaurants
        </Button>
        <Button sx={{ marginRight: 1 }} onClick={() => navigate("cart")}>
          Panier{" "}
          <Box className={classes.cartIndicator}>
            {cart.items.reduce((acc, cartItem) => acc + cartItem.quantity, 0)}
          </Box>
        </Button>
        {currentUser ? <LoggedInSection /> : <LoggedOutSection />}
      </Box>
    </Box>
  );
}
