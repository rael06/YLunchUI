import {
  Button,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { toDate } from "date-fns-tz";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../common/components/FormInput";
import ProgressButton from "../../../common/components/ProgressButton";
import useAsyncAction from "../../../common/hooks/useAsyncAction";
import useCurrentUser from "../../../common/hooks/useCurrentUser";
import { ApiError } from "../../../common/models/Common";
import { translateApiErrors } from "../../../common/translations/apiErrors";
import useCart from "../../hooks/useCart";
import { addOrderApi } from "../../services/api/orders";
import { getRestaurantByIdApi } from "../../services/api/restaurants";
import CartItem from "./CartItem";

interface Inputs extends FieldValues {
  customerComment: string;
}

export default function Cart() {
  const navigate = useNavigate();
  const { clear, cart, addProduct, removeProduct } = useCart();
  const [isNotLoggedInWhenConfirmOrder, setIsNotLoggedInWhenConfirmOrder] =
    React.useState(false);
  const { currentUser } = useCurrentUser();
  const { register, handleSubmit } = useForm<Inputs>({ mode: "onBlur" });
  const {
    actAsync,
    status,
    error: addOrderApiError,
  } = useAsyncAction<ApiError>();

  const { data: restaurant } = useQuery(
    `restaurants/${cart.restaurantId}`,
    () => getRestaurantByIdApi(cart.restaurantId)
  );

  const [isOrderSucceed, setIsOrderSucceed] = React.useState(false);

  const isCartEmpty = cart.items.length < 1;

  const totalPrice = cart.items.reduce<number>((acc, item) => {
    acc += item.product.price * item.quantity;
    return acc;
  }, 0);

  async function confirmOrder(formData: Inputs) {
    if (!currentUser) {
      setIsNotLoggedInWhenConfirmOrder(true);
    } else {
      await actAsync({
        asyncAction: async () =>
          await addOrderApi(cart.restaurantId, {
            productIds: cart.items
              .map((item) => Array(item.quantity).fill(item.product.id))
              .flat(),
            customerComment: formData.customerComment,
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
    <Container maxWidth="lg">
      <Typography mb={2} variant="h2" component="h1">
        Mon panier
      </Typography>
      {cart.items.length > 0 ? (
        <Card>
          <Container maxWidth="md">
            <CardContent>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Nom</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Quantité
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Prix total
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Retirer
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Ajouter
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.items.map((cartItem) => (
                      <TableRow
                        key={cartItem.product.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <CartItem
                          product={cartItem.product}
                          quantity={cartItem.quantity}
                          addProduct={addProduct}
                          removeProduct={removeProduct}
                        />
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {!!totalPrice && (
                  <Typography m={2}>
                    Prix total : {`${totalPrice.toFixed(2)}`.padStart(2, "0")} €
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingY: 2,
                  }}
                  component={"form"}
                  onSubmit={handleSubmit((formData) => confirmOrder(formData))}
                >
                  {" "}
                  <FormInput
                    register={register}
                    label="Commentaire"
                    name="customerComment"
                  />
                  <Box sx={{ display: "flex" }}>
                    <ProgressButton
                      label="Confirmer la réservation"
                      sx={{ marginTop: "10px" }}
                      disabled={isCartEmpty || isNotLoggedInWhenConfirmOrder}
                      status={status}
                      type="submit"
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
                    Votre réservation a bien été enregistrée, elle est en
                    attente d'acceptation par le restaurant. Vous pouvez
                    consulter son avancée dans la section{" "}
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
      ) : (
        <Typography>
          Votre panier est vide. Choisissez un des{" "}
          <span
            onClick={() => navigate("/customer/restaurants")}
            style={{ cursor: "pointer", color: "#1976d2" }}
          >
            restaurants
          </span>{" "}
          et réservez-y des produits.
        </Typography>
      )}
    </Container>
  );
}
