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
import React from "react";
import { useQuery } from "react-query";
import { translateOrderState } from "../../../common/translations/orderState";
import {
  convertUtcToZonedDate,
  convertUtcToZonedTime,
} from "../../../common/utils/dates";
import { OrderReadDto } from "../../models/Order";
import { getOrdersApi } from "../../services/api/orders";

export default function Orders() {
  const [orders, setOrders] = React.useState<OrderReadDto[]>([]);

  useQuery("orders", () => getOrdersApi(), {
    onSuccess: (response) => {
      setOrders(response);
    },
    // todo configure staleTime for performances
    // staleTime: 1 * 60 * 1000,
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography mb={2} variant="h2" component="h1">
        Mes réservations
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>N° Réservation</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Créée à
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
            {orders.length > 0 &&
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell align="center">
                    {convertUtcToZonedDate(order.creationDateTime)}
                  </TableCell>
                  <TableCell align="center">
                    {convertUtcToZonedTime(order.creationDateTime)}
                  </TableCell>
                  <TableCell align="center">
                    {convertUtcToZonedTime(order.reservedForDateTime)}
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
    </Box>
  );
}
