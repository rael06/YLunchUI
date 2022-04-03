import { Box, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GoBackButton } from "../../../../../common/components/GoBackButton";
import { RestaurantReadDto } from "../../../../../common/models/Restaurant";
import { getRestaurantByIdApi } from "../../../../services/api/restaurants";
import Products from "../../../Products";

export default function RestaurantDetails() {
  const urlParams = useParams();
  const [restaurant, setRestaurant] = React.useState<RestaurantReadDto>();

  const restaurantId = urlParams.restaurantId;

  useQuery(
    `restaurants/${restaurantId}`,
    () => getRestaurantByIdApi(restaurantId!),
    {
      onSuccess: (response) => {
        setRestaurant(response);
      },
    }
  );

  if (!restaurantId) {
    return <></>;
  }

  return (
    <Box display="flex" flexDirection="column" paddingX={2}>
      <GoBackButton />
      <Typography variant="body1">{restaurant?.name}</Typography>
      <Products restaurantId={restaurantId} />
    </Box>
  );
}
