import { Box } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { RestaurantReadDto } from "../../../common/models/Restaurant";
import { getRestaurantsApi } from "../../services/api/restaurants";
import RestaurantCard from "./RestaurantCard";
import classes from "./styles.module.scss";

export default function Restaurants() {
  const [restaurants, setRestaurants] = React.useState<RestaurantReadDto[]>([]);

  useQuery("restaurants", getRestaurantsApi, {
    onSuccess: (response) => {
      setRestaurants(response);
    },
  });



  return (
    <Box className={classes.wrapper}>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </Box>
  );
}
