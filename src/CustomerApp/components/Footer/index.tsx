import { Launch } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <Box component="footer" paddingX={2}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button onClick={() => navigate("/legal")}>Mentions légales</Button>
        <Button onClick={() => navigate("/sitemap")}>Plan du site</Button>
        <Button>
          <Box
            component={"a"}
            sx={{
              textDecoration: "none",
              color: "inherit",
            }}
            href="https://github.com/YLunch/YLunchUI"
            target="_blank"
            rel="noreferrer"
          >
            ©Ylunch 2021-2022
            <Launch fontSize="inherit" />
          </Box>
        </Button>
      </Grid>
    </Box>
  );
}
