import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RestaurantReadDto } from "../../../../common/models/Restaurant";
import classes from "./styles.module.scss";

type Props = {
  restaurant: RestaurantReadDto;
};
export default function RestaurantCard({ restaurant }: Props) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`${restaurant.id}`);
  }

  return (
    <Box className={classes.wrapper} onClick={handleClick}>
      <Typography variant="h1">{restaurant.name}</Typography>
    </Box>
  );
}
