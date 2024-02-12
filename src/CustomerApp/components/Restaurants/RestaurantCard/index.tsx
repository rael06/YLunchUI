import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RestaurantReadDto } from "../../../../common/models/Restaurant";
import {
  convertUtcMinutesToZonedTime,
  formatUtcToZonedDateDDMM,
  getClosestOpeningTimeToUtc,
} from "../../../../common/utils/dates";
import OpeningTime from "../OpeningTime";
import classes from "./styles.module.scss";

type Props = {
  restaurant: RestaurantReadDto;
  orientation: "ltr" | "rtl";
  color: string;
};

export default function RestaurantCard({
  restaurant,
  orientation,
  color,
}: Props) {
  const navigate = useNavigate();
  const flexDirection = orientation === "ltr" ? "row-reverse" : "row";
  const gradientDirection = orientation === "ltr" ? "left" : "right";

  const closestPlaceOpeningTimeToUtc = restaurant?.placeOpeningTimes
    ? getClosestOpeningTimeToUtc(restaurant.placeOpeningTimes)
    : undefined;

  const closestOrderOpeningTimeToUtc = restaurant?.orderOpeningTimes
    ? getClosestOpeningTimeToUtc(restaurant.orderOpeningTimes)
    : undefined;

  return (
    <Box
      className={classes.wrapper}
      onClick={() => navigate(`${restaurant.id}`)}
      sx={{
        display: "flex",
        flexDirection: flexDirection,
        background: `linear-gradient(to ${gradientDirection}, ${color}, transparent), url(${restaurant.base64Image}) center center/ cover`,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "clamp(2rem, 6vw, 4rem)",
          margin: "3%",
        }}
      >
        {restaurant.name}
      </Typography>
      <Box
        component="img"
        src={restaurant.base64Logo}
        sx={{
          maxWidth: "6rem",
          p: 2,
        }}
      />
      <div className={classes.openingswrapper}>
        <div className={classes.openings}>
          <Typography mr={1}>
            Horaires pour le{" "}
            {closestPlaceOpeningTimeToUtc &&
              formatUtcToZonedDateDDMM(
                convertUtcMinutesToZonedTime(
                  closestPlaceOpeningTimeToUtc.dayOfWeek,
                  closestPlaceOpeningTimeToUtc.offsetInMinutes
                ).toISOString()
              )}
          </Typography>
          <QueryBuilderIcon></QueryBuilderIcon>
          <Typography ml={1}>Sur place</Typography>
          <OpeningTime openingTime={closestPlaceOpeningTimeToUtc!} />
          <HourglassBottomIcon></HourglassBottomIcon>
          <Typography ml={1}>Réservez</Typography>
          <OpeningTime openingTime={closestOrderOpeningTimeToUtc!} />
        </div>
      </div>
    </Box>
  );
}
