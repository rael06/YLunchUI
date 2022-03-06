import Restaurants from "../Restaurants";
import classes from "./styles.module.scss";

export default function CustomerContent() {
  return (
    <div className={classes.wrapper}>
      <Restaurants />
    </div>
  );
}
