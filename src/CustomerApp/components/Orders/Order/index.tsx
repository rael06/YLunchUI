import { Box, Typography } from "@mui/material";
import { OrderReadDto } from "../../../models/Order";

type Props = {
  order: OrderReadDto;
};

export default function Order({ order }: Props) {
  console.log(order);

  return (
    <Box sx={{ diplay: "flex", flexDirection: "row" }}>
      <Typography>{order.currentOrderStatus.id}</Typography>
      <Typography>{order.currentOrderStatus.orderId}</Typography>
      <Typography>{order.currentOrderStatus.orderState}</Typography>
      <Typography>{order.currentOrderStatus.dateTime}</Typography>
    </Box>
  );
}
