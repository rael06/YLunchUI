import React from "react";
import { getLocalStorageItem } from "../../common/services/localStorage";
import { ProductReadDto } from "../../models/Product";

type CartContextType = {
  cart: Cart;
  setCart: (cart: Cart) => void;
};

export type CartItem = {
  product: ProductReadDto;
  quantity: number;
};

export type Cart = {
  restaurantId: string;
  items: CartItem[];
};

export function getCartFromLocalStorage(): Cart {
  const cart = getLocalStorageItem("cart");
  return cart ? JSON.parse(cart) : initialCart;
}

export const initialCart: Cart = { restaurantId: "", items: [] };

export const CartContext = React.createContext<CartContextType>({
  cart: initialCart,
  setCart: (_: Cart): void => {},
});

export const CartProvider: React.FC = (props) => {
  const [cart, setCart] = React.useState<Cart>(getCartFromLocalStorage());

  return (
    <CartContext.Provider
      value={{ cart, setCart }}
      {...props}
    ></CartContext.Provider>
  );
};
