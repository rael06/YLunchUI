import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { addHours } from "date-fns";
import { GoBackButton } from "../../../common/components/GoBackButton";
import useCart from "../../hooks/useCart";
import { addOrderApi } from "../../services/api/orders";
import CartItem from "./CartItem";

export default function Cart() {
  const { clear, cart, addProduct, removeProduct } = useCart();

  const isCartEmpty = cart.items.length < 1;

  const totalPrice = cart.items.reduce<number>((acc, item) => {
    acc += item.product.price * item.quantity;
    return acc;
  }, 0);

  async function confirmOrder() {
    return await addOrderApi(cart.restaurantId, {
      productIds: cart.items
        .map((item) => Array(item.quantity).fill(item.product.id))
        .flat(),
      customerComment: "",
      reservedForDateTime: new Date("2022-05-09T11:55:50.857Z"),
    });
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <GoBackButton />
      {cart.items.map((cartItem) => (
        <CartItem
          key={cartItem.product.id}
          product={cartItem.product}
          quantity={cartItem.quantity}
          addProduct={addProduct}
          removeProduct={removeProduct}
        />
      ))}
      {!!totalPrice && (
        <Typography>{`${totalPrice.toFixed(2)}`.padStart(2, "0")}</Typography>
      )}
      <Button
        sx={{ marginTop: "10px" }}
        variant="outlined"
        onClick={() => clear()}
        disabled={isCartEmpty}
      >
        Supprimer le panier
      </Button>
      <Button
        sx={{ marginTop: "10px" }}
        variant="outlined"
        onClick={confirmOrder}
        disabled={isCartEmpty}
      >
        Confirmer la réservation
      </Button>
    </Box>
  );
}
