import { Typography } from "@mui/material";
import { OpeningTimeReadDto } from "../../../../common/models/Restaurant";
import { formatUtcMinutesToZonedTime } from "../../../../common/utils/dates";

type Props = {
  openingTime: OpeningTimeReadDto;
};

export default function OpeningTime({ openingTime }: Props) {
  const { offsetInMinutes, durationInMinutes } = openingTime;

  return (
    <Typography mx={1}>
      de {formatUtcMinutesToZonedTime(offsetInMinutes)} à{" "}
      {formatUtcMinutesToZonedTime(offsetInMinutes + durationInMinutes)}
    </Typography>
  );
}
