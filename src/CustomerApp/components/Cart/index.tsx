import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { toDate } from "date-fns-tz";
import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressButton from "../../../common/components/ProgressButton";
import useAsyncAction from "../../../common/hooks/useAsyncAction";
import { ApiError } from "../../../common/models/Common";
import { translateApiErrors } from "../../../common/translations/apiErrors";
import useCart from "../../hooks/useCart";
import { addOrderApi } from "../../services/api/orders";
import CartItem from "./CartItem";

export default function Cart() {
  const navigate = useNavigate();
  const { clear, cart, addProduct, removeProduct } = useCart();
  const {
    actAsync,
    status,
    error: addOrderApiError,
  } = useAsyncAction<ApiError>();
  const [isOrderSucceed, setIsOrderSucceed] = React.useState(false);

  const isCartEmpty = cart.items.length < 1;

  const totalPrice = cart.items.reduce<number>((acc, item) => {
    acc += item.product.price * item.quantity;
    return acc;
  }, 0);

  async function confirmOrder() {
    await actAsync({
      asyncAction: async () =>
        await addOrderApi(cart.restaurantId, {
          productIds: cart.items
            .map((item) => Array(item.quantity).fill(item.product.id))
            .flat(),
          customerComment: "",
          reservedForDateTime: toDate(
            "2022-05-12T11:55:50.857+02:00"
          ).toISOString(),
        }),
      onSuccessAsync: async () => setIsOrderSucceed(true),
      // onSuccessTimeoutAsync: async () => clear(),
    });
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
      <ProgressButton
        label="Confirmer la réservation"
        sx={{ marginTop: "10px" }}
        onClick={confirmOrder}
        disabled={isCartEmpty}
        status={status}
      />
      {isOrderSucceed && (
        <Typography color="success">
          Votre réservation a bien été enregistrée, elle est en attente
          d'acceptation par le restaurant. Vous pouvez consulter son avancée
          dans la section{" "}
          <span
            onClick={() => navigate("/customer/orders")}
            style={{ cursor: "pointer", color: "#1976d2" }}
          >
            Mes réservations
          </span>
          .
        </Typography>
      )}
      {addOrderApiError &&
        addOrderApiError.status === 400 &&
        (addOrderApiError.errors.reasons.includes(
          "ReservedForDateTime must be set when the restaurant is open for orders."
        ) ? (
          <Typography color="error">
            L'horaire de retrait doit être compris dans les horaires d'ouverture
            à la commande du restaurant
          </Typography>
        ) : (
          <Typography color="error">
            {translateApiErrors(addOrderApiError, "Réservation")}
          </Typography>
        ))}
    </Box>
  );
}
