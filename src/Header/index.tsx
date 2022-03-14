import { Link } from "react-router-dom";
import classes from "./styles.module.scss";
import logo from "./ylunch-logo.png";

export default function Header() {
  return (
    <header className={classes.wrapper}>
      <Link to="/">
        <img src={logo} alt="Logo Ylunch" className={classes.logo} />
      </Link>
      <Link to="/login">Connexion</Link>
    </header>
  );
}
