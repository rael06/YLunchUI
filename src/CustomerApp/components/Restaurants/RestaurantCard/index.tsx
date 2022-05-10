import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RestaurantReadDto } from "../../../../common/models/Restaurant";
import OpeningTime from "../OpeningTime";
import classes from "./styles.module.scss";

type Props = {
  restaurant: RestaurantReadDto;
  orientation: "ltr" | "rtl";
  color: string; 
};

export default function RestaurantCard({ restaurant, orientation, color }: Props) {
  const navigate = useNavigate();
  const flexDirection = orientation === "ltr" ? "row-reverse" : "row";
  const gradientDirection = orientation === "ltr" ? "left" : "right";

  let currentDayOfWeek = 3;
  const todayPlaceOpeningTimes = restaurant.placeOpeningTimes.filter(
    (openingTime) => openingTime.dayOfWeek === currentDayOfWeek
  );
  const todayOrderOpeningTimes = restaurant.orderOpeningTimes.filter(
    (openingTime) => openingTime.dayOfWeek === currentDayOfWeek
  );

  return (
    <Box
    className={classes.wrapper}
    onClick={() => navigate(`${restaurant.id}`)}
    sx={{
      display: "flex",
      flexDirection: flexDirection,
      background: `linear-gradient(to ${gradientDirection}, ${color}, transparent), url(${restaurant.base64Image}) center center/ cover`
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
    <Box component="img" src={restaurant.base64Logo}
      sx={
        {
          maxWidth: "6rem",
          p: 2
        }
      }
    />
      <div className={classes.openingswrapper}>
        <div className={classes.openings}>
          <Typography
            mr={1}
            sx={{
              fontWeight: "bold",
            }}
          >
            Horaires
          </Typography>
          <QueryBuilderIcon></QueryBuilderIcon>
          {todayPlaceOpeningTimes.length !== 0 ? (
            <>
              <Typography ml={1}>Sur place</Typography>
              {todayPlaceOpeningTimes.map((openingTime) => (
                <OpeningTime key={openingTime.id} openingTime={openingTime} />
              ))}
            </>
          ) : (
            <Typography mx={1}>Fermé aujourd'hui</Typography>
          )}
          <HourglassBottomIcon></HourglassBottomIcon>
          {todayOrderOpeningTimes.length !== 0 ? (
            <>
              <Typography ml={1}>Réservez</Typography>
              {todayOrderOpeningTimes.map((openingTime) => (
                <OpeningTime key={openingTime.id} openingTime={openingTime} />
              ))}
            </>
          ) : (
            <Typography mx={1}>Fermé aujourd'hui</Typography>
          )}
        </div>
      </div>
    </Box>
  );
}
