import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import useCurrentUser from "../../../common/hooks/useCurrentUser";
import LoggedOutSection from "./components/LoggedOutSection";
import LoggedInSection from "./components/LoggedInSection";
import logo from "./ylunch-logo.png";
import React from "react";
import { getCurrentUserApi } from "../../../common/services/api/authentication";
import { getLocalStorageItem } from "../../../common/services/localStorage";

export default function Header() {
  const { currentUser, setCurrentUser } = useCurrentUser();

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
      {currentUser ? <LoggedInSection /> : <LoggedOutSection />}
    </Box>
  );
}
