import React from "react";
import { useQuery } from "react-query";
import { RestaurantReadDto } from "../../../models/Restaurant";
import { getRestaurants } from "../../../services/api/restaurant";
import Restaurant from "./RestaurantCard";
import classes from "./styles.module.scss";

export default function Restaurants() {
  const [restaurants, setRestaurants] = React.useState<RestaurantReadDto[]>([]);

  useQuery("restaurants", getRestaurants, {
    onSuccess: (response) => {
      setRestaurants(response);
    },
  });

  return (
    <div className={classes.wrapper}>
      {restaurants.map((restaurant) => (
        <Restaurant key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
