import {
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
import { useLocation } from "react-router-dom";
import { translateOrderState } from "../../../common/translations/orderState";
import {
  compareUtcDateTime,
  formatUtcToZonedDateTime,
} from "../../../common/utils/dates";
import { getOrdersApi } from "../../services/api/orders";

export default function Orders() {
  const { data: orders } = useQuery("orders", () => getOrdersApi());
  const location = useLocation();

  if (!orders) {
    return <></>;
  }

  const sortedOrders = orders.sort((o1, o2) =>
    compareUtcDateTime(o1.creationDateTime, o2.creationDateTime, "descending")
  );

  return (
    <Container maxWidth="lg">
      <Typography mb={2} variant="h2" component="h1">
        Mes réservations
      </Typography>
      {sortedOrders.length === 0 ? (
        <Typography>Aucune réservation enregistrée</Typography>
      ) : (
        <>
          {location.state &&
            (
              location.state as {
                isFromConfirmCart: boolean;
              }
            ).isFromConfirmCart && (
              <Typography>
                {
                  (
                    location.state as {
                      message: string;
                    }
                  ).message
                }
              </Typography>
            )}
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    N° Réservation
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Créée le
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Réservée pour
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Prix total
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    État
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell align="center">
                      {formatUtcToZonedDateTime(order.creationDateTime)}
                    </TableCell>
                    <TableCell align="center">
                      {formatUtcToZonedDateTime(order.reservedForDateTime)}
                    </TableCell>
                    <TableCell align="center">
                      {order.totalPrice.toFixed(2)} €
                    </TableCell>
                    <TableCell align="center">
                      {translateOrderState(order.currentOrderStatus.orderState)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}
