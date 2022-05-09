import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { getRestaurantsApi } from "../../services/api/restaurants";
import RestaurantCard from "./RestaurantCard";
import classes from "./styles.module.scss";

export default function Restaurants() {
  const { data: restaurants } = useQuery("restaurants", getRestaurantsApi);

  return (
    <Box className={classes.wrapper}>
      {restaurants?.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </Box>
  );
}
