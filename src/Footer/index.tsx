import { Launch } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./styles.module.scss";

export default function Footer() {
  return (
    <footer className={classes.wrapper}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link to="/legal" className={classes.link}>
          Mentions légales
        </Link>
        <Link to="/sitemap" className={classes.link}>
          Plan du site
        </Link>
        <a
          className={classes.link}
          href="https://github.com/YLunch/YLunchUI"
          target="_blank"
          rel="noreferrer"
        >
          ©Ylunch 2021-2022
          <Launch fontSize="inherit" />
        </a>
      </Grid>
    </footer>
  );
}
