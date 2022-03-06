import { Container, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "./YLunch-logo.png";
import classes from "./styles.module.scss";

export default function Header() {
  return (
    <Box boxShadow={1}>
      <header>
        <Container maxWidth="xl" className={classes.wrapper}>
          <Link to="/">
            <img src={logo} alt="Logo Ylunch" className={classes.logo} />
          </Link>
          <Link to="/login">Login</Link>
        </Container>
      </header>
    </Box>
  );
}
