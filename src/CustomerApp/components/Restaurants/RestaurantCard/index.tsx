import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RestaurantReadDto } from "../../../../common/models/Restaurant";
import OpeningTime from "../OpeningTime";
import classes from "./styles.module.scss";

type Props = {
  restaurant: RestaurantReadDto;
};

export default function RestaurantCard({ restaurant }: Props) {
  const navigate = useNavigate();

  let currentDayOfWeek = 1;
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
              <Typography ml={1}>Commandez</Typography>
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
