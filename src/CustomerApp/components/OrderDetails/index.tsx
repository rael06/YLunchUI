import { Remove } from "@mui/icons-material";
import {
  Box,
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
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSimpleId } from "../../../common/utils/id";
import { getOrderByIdApi } from "../../services/api/orders";
import { getRestaurantByIdApi } from "../../services/api/restaurants";
import OrderRow from "../Orders/OrderRow";
import OrderedItemRow, { OrderedItem } from "./OrderedItemRow";

export default function RestaurantDetails() {
  const urlParams = useParams();

  const orderId = urlParams.orderId;

  const { data: order } = useQuery(`orders/${orderId}`, () =>
    getOrderByIdApi(orderId!)
  );

  const { data: restaurant } = useQuery(
    `restaurants/${order?.restaurantId}`,
    () => {
      if (order) {
        return getRestaurantByIdApi(order.restaurantId);
      }
    }
  );

  if (!orderId || !order || !restaurant) {
    return <></>;
  }

  const orderedItems: OrderedItem[] = order.orderedProducts.reduce(
    (acc, orderedProduct) => {
      let orderedItem = acc.find(
        (orderedItem) =>
          orderedItem.orderedProduct.productId === orderedProduct.productId
      );

      if (orderedItem) {
        orderedItem = { ...orderedItem, quantity: orderedItem.quantity++ };
        return acc;
      }
      return [...acc, { orderedProduct, quantity: 1 }];
    },
    Array<OrderedItem>()
  );

  return (
    <Container maxWidth="lg">
      <Typography mb={2} variant="h2" component="h1">
        {`Réservation n° ${getSimpleId(order.id)}`}
      </Typography>

      <Card>
        <Container maxWidth="md">
          <CardContent>
            <Typography mb={5} variant="h4" component="h1">
              {restaurant.name}
            </Typography>

            <Box mb={5}>
              <Typography sx={{ fontWeight: "bold" }}>Informations</Typography>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Créée le
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Réservée pour
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Prix total
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>État</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <OrderRow key={order.id} order={order} />
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box mb={5}>
              <Typography sx={{ fontWeight: "bold" }}>
                Produits réservés
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Nom</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Quantité
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Prix total
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderedItems.map((orderedItem) => (
                      <OrderedItemRow
                        key={orderedItem.orderedProduct.id}
                        orderedItem={orderedItem}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box mb={5}>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Prix total : </span>
                {`${order.totalPrice.toFixed(2)}`.padStart(2, "0")} €
              </Typography>
            </Box>

            <Box mb={5}>
              <Box mb={2}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Votre Commentaire :
                </Typography>
                {order.customerComment ? (
                  <Typography>{order.customerComment}</Typography>
                ) : (
                  <Remove />
                )}
              </Box>
              <Typography sx={{ fontWeight: "bold" }}>
                Commentaire du restaurant :
              </Typography>
              {order.restaurantComment ? (
                <Typography>{order.restaurantComment}</Typography>
              ) : (
                <Remove />
              )}
            </Box>
          </CardContent>
        </Container>
      </Card>
    </Container>
  );
}
