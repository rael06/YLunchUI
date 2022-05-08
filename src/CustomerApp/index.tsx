import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "./contexts/CartContext";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import classes from "./styles.module.scss";

export default function CustomerApp() {
  return (
    <CurrentUserProvider>
      <CartProvider>
        <div className={classes.wrapper}>
          <Header />
          <div className={classes.body}>
            <Body />
          </div>
          <Footer />
        </div>
      </CartProvider>
    </CurrentUserProvider>
  );
}
