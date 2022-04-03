import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoggedOutSection() {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="row">
      <Box marginRight={1}>
        <Button onClick={() => navigate("registration")}>S'enregistrer</Button>{" "}
      </Box>

      <Box>
        <Button onClick={() => navigate("login")}>Connexion</Button>
      </Box>
    </Box>
  );
}
