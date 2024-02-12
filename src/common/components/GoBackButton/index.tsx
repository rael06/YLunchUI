import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function GoBackButton() {
  const navigate = useNavigate();
  return (
    <Box>
      <IconButton onClick={() => navigate(-1)} color="primary">
        <ArrowBack />
      </IconButton>
    </Box>
  );
}
