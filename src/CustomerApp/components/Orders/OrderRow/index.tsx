import { TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { translateOrderState } from "../../../../common/translations/orderState";
import { formatUtcToZonedDateTime } from "../../../../common/utils/dates";
import { getSimpleId } from "../../../../common/utils/id";
import { OrderReadDto } from "../../../models/Order";

type Props = {
  order: OrderReadDto;
  withIdCell?: boolean;
  clickable?: boolean;
};

export default function OrderRow({
  order,
  withIdCell = false,
  clickable = false,
}: Props) {
  const navigate = useNavigate();

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: clickable ? "pointer" : "inherit",
        ":hover": clickable ? { backgroundColor: "#EEE" } : {},
      }}
      onClick={() => {
        if (clickable) {
          navigate(`/customer/orders/${order.id}`);
        }
      }}
    >
      {withIdCell && (
        <TableCell component="th" scope="row">
          {getSimpleId(order.id)}
        </TableCell>
      )}
      <TableCell>{formatUtcToZonedDateTime(order.creationDateTime)}</TableCell>
      <TableCell>
        {formatUtcToZonedDateTime(order.reservedForDateTime)}
      </TableCell>
      <TableCell>{order.totalPrice.toFixed(2)} €</TableCell>
      <TableCell>
        {translateOrderState(order.currentOrderStatus.orderState)}
      </TableCell>
    </TableRow>
  );
}
