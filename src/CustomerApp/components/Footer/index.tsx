import { Launch } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import classes from "./styles.module.scss";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <Box component="footer" paddingX={2} className={classes.wrapper}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button onClick={() => navigate("/legal")}>Mentions légales</Button>
        <Button onClick={() => navigate("/sitemap")}>Plan du site</Button>
        <Button>
          <a
            className={classes.link}
            href="https://github.com/YLunch/YLunchUI"
            target="_blank"
            rel="noreferrer"
          >
            ©Ylunch 2021-2022
            <Launch fontSize="inherit" />
          </a>
        </Button>
      </Grid>
    </Box>
  );
}
