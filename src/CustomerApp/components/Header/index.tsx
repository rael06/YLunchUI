import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GoBackButton } from "../../../common/components/GoBackButton";
import useAsyncAction from "../../../common/hooks/useAsyncAction";
import useCurrentUser from "../../../common/hooks/useCurrentUser";
import { getCurrentUserApi } from "../../../common/services/api/authentication";
import { getLocalStorageItem } from "../../../common/services/localStorage";
import { CartContext } from "../../contexts/CartContext";
import LoggedInSection from "./components/LoggedInSection";
import LoggedOutSection from "./components/LoggedOutSection";
import classes from "./style.module.scss";
import logo from "./ylunch-logo.png";

export default function Header() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { cart } = React.useContext(CartContext);
  const { actAsync, status } = useAsyncAction();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      getLocalStorageItem("accessToken") &&
      getLocalStorageItem("refreshToken")
    ) {
      actAsync({
        asyncAction: async () =>
          await getCurrentUserApi().then((res) => {
            setCurrentUser(res);
          }),
      });
    }
  }, [setCurrentUser, actAsync]);

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

      {status !== "loading" && (
        <Box sx={{ display: "flex", flexWrap: "wrap-reverse" }}>
          <Button
            sx={{ marginRight: 1 }}
            onClick={() => navigate("restaurants")}
          >
            Restaurants
          </Button>
          <Button sx={{ marginRight: 1 }} onClick={() => navigate("cart")}>
            Panier{" "}
            <Box className={classes.cartIndicator}>
              {cart.items
                ? cart.items.reduce(
                    (acc, cartItem) => acc + cartItem.quantity,
                    0
                  )
                : 0}
            </Box>
          </Button>
          {currentUser ? <LoggedInSection /> : <LoggedOutSection />}
        </Box>
      )}
    </Box>
  );
}
