import { Route, Routes } from "react-router-dom";
import Restaurants from "./components/Restaurants";
import classes from "./styles.module.scss";

export default function CustomerApp() {
  return (
    <div className={classes.wrapper}>
      <Routes>
        <Route path="" element={<Restaurants />} />
      </Routes>
    </div>
  );
}
