import { OpeningTimeReadDto } from "./../models/Restaurant";
import { addDays } from "date-fns";
import { format, toDate, utcToZonedTime } from "date-fns-tz";

function parseUtcString(date: string): string {
  return date.endsWith("Z") ? date : `${date}Z`;
}

export function formatUtcToZonedDateTime(date: string) {
  return format(toDate(parseUtcString(date)), "dd/MM/yyyy HH:mm:ss", {
    timeZone: "Europe/Paris",
  });
}

export function formatUtcToZonedDate(date: string) {
  return format(toDate(parseUtcString(date)), "dd/MM/yyyy", {
    timeZone: "Europe/Paris",
  });
}

export function formatUtcToZonedDateDDMM(date: string) {
  return format(toDate(parseUtcString(date)), "dd/MM", {
    timeZone: "Europe/Paris",
  });
}

export function formatUtcToZonedTime(date: string) {
  return format(toDate(parseUtcString(date)), "HH:mm", {
    timeZone: "Europe/Paris",
  });
}

export function formatUtcMinutesToZonedTime(minutes: number) {
  const utcDate = toDate(new Date());
  const yyyy = utcDate.getUTCFullYear();
  const MM = (utcDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const dd = utcDate.getUTCDate().toString().padStart(2, "0");
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");

  const utcDateTime = `${yyyy}-${MM}-${dd}T${hh}:${mm}Z`;
  return formatUtcToZonedTime(utcDateTime);
}

export function getMinutesFromUtcMidnight(date: Date) {
  return date.getUTCHours() * 60 + date.getUTCMinutes();
}

export function getNowUtcDateTime() {
  return toDate(new Date());
}

export function getNowZonedDateTime() {
  return toDate(new Date(), {
    timeZone: "Europe/Paris",
  });
}

function findNextMatchingUtcDateTime(dayOfWeek: number) {
  let utcDateTime = getNowUtcDateTime();
  for (let i = 0; i < 7; i++) {
    utcDateTime = addDays(getNowUtcDateTime(), i);
    if (utcDateTime.getUTCDay() === dayOfWeek) {
      return utcDateTime;
    }
  }
  return utcDateTime;
}

export function convertUtcMinutesToZonedTime(
  dayOfWeek: number,
  minutes: number
) {
  const utcDate = findNextMatchingUtcDateTime(dayOfWeek);
  const yyyy = utcDate.getUTCFullYear();
  const MM = (utcDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const dd = utcDate.getUTCDate().toString().padStart(2, "0");
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");

  const utcDateTime = `${yyyy}-${MM}-${dd}T${hh}:${mm}Z`;
  return convertUtcToZonedDateTime(utcDateTime);
}

export function formatSimpleMinutesFromMidnightToTime(minutes: number) {
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");

  return `${hh}:${mm}`;
}

export function convertUtcToZonedDateTime(date: string) {
  return utcToZonedTime(parseUtcString(date), "Europe/Paris");
}

export function compareUtcDateTime(
  date1: string,
  date2: string,
  by: "ascending" | "descending"
) {
  return (
    (convertUtcToZonedDateTime(date1).getTime() -
      convertUtcToZonedDateTime(date2).getTime()) *
    (by === "ascending" ? 1 : -1)
  );
}

export function getClosestOpeningTimeToUtc(openingTimes: OpeningTimeReadDto[]) {
  return openingTimes
    .filter(
      (o) =>
        convertUtcMinutesToZonedTime(
          o.dayOfWeek,
          o.offsetInMinutes + o.durationInMinutes
        ).getTime() > getNowUtcDateTime().getTime()
    )
    .map((o) => {
      return {
        time: convertUtcMinutesToZonedTime(
          o.dayOfWeek,
          o.offsetInMinutes
        ).getTime(),
        value: o,
      };
    })
    .sort((d1, d2) => d1.time - d2.time)[0].value;
}
