import { Button } from "@mui/material";
import useCurrentUser from "../../../../../common/hooks/useCurrentUser";
import { removeLocalStorageItem } from "../../../../../common/services/localStorage";

export default function LoggedInSection() {
  const { currentUser, setCurrentUser } = useCurrentUser();

  if (!currentUser) {
    return <></>;
  }

  const { email } = currentUser;

  function handleLogout() {
    removeLocalStorageItem("accessToken");
    removeLocalStorageItem("refreshToken");
    setCurrentUser(undefined);
  }

  return (
    <div style={{ display: "flex" }}>
      <span>{email}</span>
      <Button variant="outlined" onClick={handleLogout}>
        Déconnexion
      </Button>
    </div>
  );
}
