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
import { GoBackButton } from "../../../common/components/GoBackButton";
import { convertUtcToZonedDateTime } from "../../../common/helpers/dates";
import { translateOrderState } from "../../../common/translations/orderState";
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
              <TableCell sx={{ fontWeight: "bold" }}>N° Réservation</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Créée à
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Réservée pour
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Prix total
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Changement d'état à
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
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
                  <TableCell align="right">
                    {convertUtcToZonedDateTime(order.creationDateTime)}
                  </TableCell>
                  <TableCell align="right">
                    {convertUtcToZonedDateTime(order.creationDateTime)}
                  </TableCell>
                  <TableCell align="right">
                    {convertUtcToZonedDateTime(order.reservedForDateTime)}
                  </TableCell>
                  <TableCell align="right">
                    {order.totalPrice.toFixed(2)} €
                  </TableCell>
                  <TableCell align="right">
                    {convertUtcToZonedDateTime(
                      order.currentOrderStatus.dateTime
                    )}
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
