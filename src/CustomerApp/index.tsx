import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import classes from "./styles.module.scss";

export default function CustomerApp() {
  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.body}>
        <Body />
      </div>
      <Footer />
    </div>
  );
}
