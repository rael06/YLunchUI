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

export function formatUtcToZonedTime(date: string) {
  return format(toDate(parseUtcString(date)), "HH:mm", {
    timeZone: "Europe/Paris",
  });
}

export function formatUtcMinutesToZonedTime(minutes: number) {
  const utcDate = toDate(new Date());
  const yyyy = utcDate.getUTCFullYear();
  const MM = utcDate.getUTCMonth().toString().padStart(2, "0");
  const dd = utcDate.getUTCDate().toString().padStart(2, "0");
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");

  const utcDateTime = `${yyyy}-${MM}-${dd}T${hh}:${mm}Z`;
  return formatUtcToZonedTime(utcDateTime);
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
