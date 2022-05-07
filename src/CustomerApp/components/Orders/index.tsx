import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { format, utcToZonedTime, toDate } from "date-fns-tz";
import React from "react";
import { useQuery } from "react-query";
import { GoBackButton } from "../../../common/components/GoBackButton";
import { translateOrderState } from "../../../common/services/translations/orderState";
import { OrderReadDto } from "../../models/Order";
import { getOrdersApi } from "../../services/api/orders";

export default function Orders() {
  const [orders, setOrders] = React.useState<OrderReadDto[]>([]);

  useQuery("Orders", () => getOrdersApi(), {
    onSuccess: (response) => {
      setOrders(response);
    },
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <GoBackButton />
      <Typography mb={2} variant="h2" component="h1">
        Mes réservations
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>N° Réservation</TableCell>
              <TableCell align="right">Créée le</TableCell>
              <TableCell align="right">Réservée pour le</TableCell>
              <TableCell align="right">Prix total</TableCell>
              <TableCell align="right">Dernier changement d'état le</TableCell>
              <TableCell align="right">État</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 &&
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell align="right">
                    {format(
                      utcToZonedTime(
                        toDate(order.creationDateTime.toString()),
                        "Europe/Paris"
                      ),
                      "dd/MM/yyyy HH:mm:ss zzz",
                      { timeZone: "Europe/Paris" }
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {order.reservedForDateTime}
                  </TableCell>
                  <TableCell align="right">
                    {order.totalPrice.toFixed(2)} €
                  </TableCell>
                  <TableCell align="right">
                    {order.currentOrderStatus.dateTime}
                  </TableCell>
                  <TableCell align="right">
                    {translateOrderState(order.currentOrderStatus.orderState)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
