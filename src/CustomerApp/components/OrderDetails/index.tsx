import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getOrderByIdApi } from "../../services/api/orders";

export default function RestaurantDetails() {
  const urlParams = useParams();

  const orderId = urlParams.orderId;

  const { data: order } = useQuery(`orders/${orderId}`, () =>
    getOrderByIdApi(orderId!)
  );

  if (!orderId || !order) {
    return <></>;
  }

  console.log(order);

  return (
    <Box display="flex" flexDirection="column">
      {order.id}
    </Box>
  );
}
