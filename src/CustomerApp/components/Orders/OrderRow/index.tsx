import { TableCell, TableRow } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { translateOrderState } from "../../../../common/translations/orderState";
import { formatUtcToZonedDateTime } from "../../../../common/utils/dates";
import { getSimpleId } from "../../../../common/utils/id";
import { OrderReadDto } from "../../../models/Order";
import { getRestaurantByIdApi } from "../../../services/api/restaurants";

type Props = {
  order: OrderReadDto;
  withIdAndRestaurantName?: boolean;
  clickable?: boolean;
};

export default function OrderRow({
  order,
  withIdAndRestaurantName = false,
  clickable = false,
}: Props) {
  const navigate = useNavigate();

  const { data: restaurant } = useQuery(
    `restaurants/${order.restaurantId}`,
    () => {
      if (order) {
        return getRestaurantByIdApi(order.restaurantId);
      }
    }
  );

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
      {withIdAndRestaurantName && (
        <>
          <TableCell component="th" scope="row">
            {getSimpleId(order.id)}
          </TableCell>
          <TableCell>{restaurant?.name}</TableCell>
        </>
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
