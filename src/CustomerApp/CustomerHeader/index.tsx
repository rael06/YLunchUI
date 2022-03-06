import { Link } from "react-router-dom";
import classes from "./styles.module.scss";

export default function Header() {
  return (
    <div className={classes.header}>
      <div>Header</div>
      <Link to="/login">Login</Link>
    </div>
  );
}
