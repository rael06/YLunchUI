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
import { compareUtcDateTime } from "../../../common/utils/dates";
import { getOrdersApi } from "../../services/api/orders";
import OrderRow from "./OrderRow";

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
                  <OrderRow key={order.id} order={order} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}
