import { RestaurantReadDto } from "../../../../common/models/Restaurant";
import classes from "./styles.module.scss";

type Props = {
  restaurant: RestaurantReadDto;
};
export default function Restaurant({ restaurant }: Props) {
  return <div className={classes.wrapper}>{restaurant.name}</div>;
}
