import { TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { translateOrderState } from "../../../../common/translations/orderState";
import { formatUtcToZonedDateTime } from "../../../../common/utils/dates";
import { OrderReadDto } from "../../../models/Order";

type Props = {
  order: OrderReadDto;
};

export default function OrderRow({ order }: Props) {
  const navigate = useNavigate();

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
        ":hover": { backgroundColor: "#EEE" },
      }}
      onClick={() => navigate(`/customer/orders/${order.id}`)}
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
      <TableCell align="center">{order.totalPrice.toFixed(2)} €</TableCell>
      <TableCell align="center">
        {translateOrderState(order.currentOrderStatus.orderState)}
      </TableCell>
    </TableRow>
  );
}
