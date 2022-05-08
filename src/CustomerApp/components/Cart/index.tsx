import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { toDate } from "date-fns-tz";
import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressButton from "../../../common/components/ProgressButton";
import useAsyncAction from "../../../common/hooks/useAsyncAction";
import useCurrentUser from "../../../common/hooks/useCurrentUser";
import { ApiError } from "../../../common/models/Common";
import { translateApiErrors } from "../../../common/translations/apiErrors";
import useCart from "../../hooks/useCart";
import { addOrderApi } from "../../services/api/orders";
import CartItem from "./CartItem";

export default function Cart() {
  const navigate = useNavigate();
  const { clear, cart, addProduct, removeProduct } = useCart();
  const [isNotLoggedInWhenConfirmOrder, setIsNotLoggedInWhenConfirmOrder] =
    React.useState(false);
  const { currentUser } = useCurrentUser();
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
    if (!currentUser) {
      setIsNotLoggedInWhenConfirmOrder(true);
    } else {
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
        onSuccessTimeoutAsync: async () => clear(),
      });
    }
  }

  function clearCart() {
    setIsNotLoggedInWhenConfirmOrder(false);
    clear();
  }

  return (
    <Card>
      <Container maxWidth="md">
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {cart.items.length > 0 ? (
              cart.items.map((cartItem) => (
                <CartItem
                  key={cartItem.product.id}
                  product={cartItem.product}
                  quantity={cartItem.quantity}
                  addProduct={addProduct}
                  removeProduct={removeProduct}
                />
              ))
            ) : (
              <Typography> Panier vide</Typography>
            )}
            {!!totalPrice && (
              <Typography>
                {`${totalPrice.toFixed(2)}`.padStart(2, "0")} €
              </Typography>
            )}
            <Box sx={{ display: "flex" }}>
              <ProgressButton
                label="Confirmer la réservation"
                sx={{ marginTop: "10px" }}
                onClick={confirmOrder}
                disabled={isCartEmpty || isNotLoggedInWhenConfirmOrder}
                status={status}
              />
              <Button
                sx={{ marginTop: "10px" }}
                variant="outlined"
                onClick={clearCart}
                disabled={isCartEmpty}
              >
                Supprimer le panier
              </Button>
            </Box>
            {isNotLoggedInWhenConfirmOrder && (
              <Typography color="error">
                Veuillez vous{" "}
                <span
                  onClick={() => navigate("/customer/login")}
                  style={{ cursor: "pointer", color: "#1976d2" }}
                >
                  connecter
                </span>{" "}
                pour enregistrer votre réservation.
              </Typography>
            )}
            {currentUser && isOrderSucceed && (
              <Typography>
                Votre réservation a bien été enregistrée, elle est en attente
                d'acceptation par le restaurant. Vous pouvez consulter son
                avancée dans la section{" "}
                <span
                  onClick={() => navigate("/customer/orders")}
                  style={{ cursor: "pointer", color: "#1976d2" }}
                >
                  Mes réservations
                </span>
                .
              </Typography>
            )}
            <Typography
              color="error"
              visibility={
                addOrderApiError &&
                addOrderApiError.status === 400 &&
                addOrderApiError.errors.reasons.includes(
                  "ReservedForDateTime must be set when the restaurant is open for orders."
                )
                  ? "visible"
                  : "hidden"
              }
            >
              L'horaire de retrait doit être compris dans les horaires
              d'ouverture à la commande du restaurant
            </Typography>
            <Typography
              color="error"
              visibility={
                addOrderApiError &&
                addOrderApiError.status === 400 &&
                !addOrderApiError.errors.reasons.includes(
                  "ReservedForDateTime must be set when the restaurant is open for orders."
                )
                  ? "visible"
                  : "hidden"
              }
            >
              {translateApiErrors(addOrderApiError, "Réservation")}
            </Typography>
          </Box>
        </CardContent>
      </Container>
    </Card>
  );
}
