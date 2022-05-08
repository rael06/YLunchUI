import { Typography } from "@mui/material";
import { OpeningTimeReadDto } from "../../../../common/models/Restaurant";
import { convertUtcMinutesToZonedTime } from "../../../../common/utils/dates";

type Props = {
  openingTime: OpeningTimeReadDto;
};

export default function OpeningTime({ openingTime }: Props) {
  const { offsetInMinutes, durationInMinutes } = openingTime;

  return (
    <Typography mx={1}>
      de {convertUtcMinutesToZonedTime(offsetInMinutes)} à{" "}
      {convertUtcMinutesToZonedTime(offsetInMinutes + durationInMinutes)}
    </Typography>
  );
}
