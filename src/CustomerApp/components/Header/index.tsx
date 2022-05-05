import { Box, Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useCurrentUser from "../../../common/hooks/useCurrentUser";
import { getCurrentUserApi } from "../../../common/services/api/authentication";
import { getLocalStorageItem } from "../../../common/services/localStorage";
import LoggedInSection from "./components/LoggedInSection";
import LoggedOutSection from "./components/LoggedOutSection";
import logo from "./ylunch-logo.png";

export default function Header() {
  const { currentUser, setCurrentUser } = useCurrentUser();
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
      }}
      paddingX={2}
      component={"header"}
    >
      <Link to="/">
        <Box
          component={"img"}
          sx={{ height: "50px" }}
          src={logo}
          alt="Logo Ylunch"
        />
      </Link>

      <Box marginRight={1}>
        <Button sx={{ marginRight: "5px" }} onClick={() => navigate("cart")}>
          Panier
        </Button>
      </Box>
      {currentUser ? <LoggedInSection /> : <LoggedOutSection />}
    </Box>
  );
}
