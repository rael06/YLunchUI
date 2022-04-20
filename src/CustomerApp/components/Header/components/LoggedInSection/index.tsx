import { Box, Button, Typography } from "@mui/material";
import useCurrentUser from "../../../../../common/hooks/useCurrentUser";
import { logoutApi } from "../../../../../common/services/api/authentication";
import { removeLocalStorageItem } from "../../../../../common/services/localStorage";

export default function LoggedInSection() {
  const { currentUser, setCurrentUser } = useCurrentUser();

  if (!currentUser) {
    return <></>;
  }

  const { email } = currentUser;

  async function handleLogout() {
    await logoutApi();
    removeLocalStorageItem("accessToken");
    removeLocalStorageItem("refreshToken");
    setCurrentUser(undefined);
  }

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1" marginRight={1}>
        {email}
      </Typography>
      <Button onClick={handleLogout}>Déconnexion</Button>
    </Box>
  );
}
