import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import useCurrentUser from "../../../common/hooks/useCurrentUser";
import LoggedOutSection from "./components/LoggedOutSection";
import LoggedInSection from "./components/LoggedInSection";
import classes from "./styles.module.scss";
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
      sx={{ boxShadow: 1 }}
      paddingX={2}
      component={"header"}
      className={classes.wrapper}
    >
      <Link to="/">
        <img src={logo} alt="Logo Ylunch" className={classes.logo} />
      </Link>
      {currentUser ? <LoggedInSection /> : <LoggedOutSection />}
    </Box>
  );
}
