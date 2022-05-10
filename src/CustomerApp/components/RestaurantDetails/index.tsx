import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getRestaurantByIdApi } from "../../services/api/restaurants";
import Products from "../Products";
import RestaurantHeader from "./RestaurantHeader";

export default function RestaurantDetails() {
  const urlParams = useParams();

  const restaurantId = urlParams.restaurantId;

  const { data: restaurant } = useQuery(`restaurants/${restaurantId}`, () =>
    getRestaurantByIdApi(restaurantId!)
  );

  if (!restaurantId || !restaurant) {
    return <></>;
  }

  return (
    <Box display="flex" flexDirection="column">
      <RestaurantHeader restaurant={restaurant} />
      <Products restaurantId={restaurantId} />
    </Box>
  );
}
