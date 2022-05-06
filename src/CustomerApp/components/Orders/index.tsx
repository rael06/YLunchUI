import { Box } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { GoBackButton } from "../../../common/components/GoBackButton";
import { OrderReadDto } from "../../models/Order";
import { getOrdersApi } from "../../services/api/orders";
import Order from "./Order";

export default function Orders() {
  const [orders, setOrders] = React.useState<OrderReadDto[]>([]);

  useQuery("Orders", () => getOrdersApi(), {
    onSuccess: (response) => {
      setOrders(response);
    },
  });

  console.log(orders);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <GoBackButton />
      {orders.length > 0 &&
        orders.map((order) => <Order key={order.id} order={order} />)}
    </Box>
  );
}
