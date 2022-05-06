import { Typography } from "@mui/material";
import { OpeningTimeReadDto } from "../../../../common/models/Restaurant";

type Props = {
  openingTime: OpeningTimeReadDto;
};

function getFormattedTime(minutes: number) {
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");
  return `${hh}h${mm}`;
}

export default function OpeningTime({ openingTime }: Props) {
  const { offsetInMinutes, durationInMinutes } = openingTime;

  return (
    <Typography mx={1}>
      de {getFormattedTime(offsetInMinutes)} à{" "}
      {getFormattedTime(offsetInMinutes + durationInMinutes)}
    </Typography>
  );
}
