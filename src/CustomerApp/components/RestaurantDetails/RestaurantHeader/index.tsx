import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { RestaurantReadDto } from "../../../../common/models/Restaurant";

type Props = { restaurant: RestaurantReadDto };

export default function RestaurantHeader({ restaurant }: Props) {
  return (
    <Box
      sx={{
        p: 5,
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundImage: ` linear-gradient(to right, #03989e 6rem, transparent) ,
        url(${restaurant.base64Image})`,
        backgroundPosition: "center, center",
        backgroundSize: "cover, cover",
      }}
    >
      <Box
        sx={{
          maxWidth: "6rem",
          objectFit: "contain",
        }}
        component="img"
        src={restaurant.base64Logo}
      />
      <Typography sx={{ mx: "auto", pr: "30%" }} variant="h2" color={"white"}>
        {restaurant.name}
      </Typography>
    </Box>
  );
}
