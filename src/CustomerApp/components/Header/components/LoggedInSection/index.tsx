import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProgressButton from "../../../../../common/components/ProgressButton";
import useAsyncAction from "../../../../../common/hooks/useAsyncAction";
import useCurrentUser from "../../../../../common/hooks/useCurrentUser";
import { logoutApi } from "../../../../../common/services/api/authentication";
import { removeLocalStorageItem } from "../../../../../common/services/localStorage";

export default function LoggedInSection() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { actAsync, status } = useAsyncAction();
  const navigate = useNavigate();

  if (!currentUser) {
    return <></>;
  }

  const { email } = currentUser;

  async function logout() {
    await actAsync({
      asyncAction: async () => await logoutApi(),
      onSuccessTimeoutAsync: async () => {
        removeLocalStorageItem("accessToken");
        removeLocalStorageItem("refreshToken");
        setCurrentUser(undefined);
      },
      onErrorTimeoutAsync: async () => {
        removeLocalStorageItem("accessToken");
        removeLocalStorageItem("refreshToken");
        setCurrentUser(undefined);
      },
    });
  }

  return (
    <Box display="flex" alignItems="center">
      <Button sx={{ marginRight: 1 }} onClick={() => navigate("orders")}>
        Mes commandes
      </Button>
      <Typography variant="body1" marginRight={1}>
        {email}
      </Typography>

      <ProgressButton label="Déconnexion" status={status} onClick={logout} />
    </Box>
  );
}
