import { format, toDate } from "date-fns-tz";

function parseUtcString(date: string): string {
  return date.endsWith("Z") ? date : `${date}Z`;
}

export function convertUtcToZonedDateTime(date: string) {
  return format(toDate(parseUtcString(date)), "dd/MM/yyyy HH:mm:ss", {
    timeZone: "Europe/Paris",
  });
}

export function convertUtcToZonedDate(date: string) {
  return format(toDate(parseUtcString(date)), "dd/MM/yyyy", {
    timeZone: "Europe/Paris",
  });
}

export function convertUtcToZonedTime(date: string) {
  return format(toDate(parseUtcString(date)), "HH:mm", {
    timeZone: "Europe/Paris",
  });
}

export function convertUtcMinutesToZonedTime(minutes: number) {
  const utcDate = toDate(new Date());
  const yyyy = utcDate.getUTCFullYear();
  const MM = utcDate.getUTCMonth().toString().padStart(2, "0");
  const dd = utcDate.getUTCDate().toString().padStart(2, "0");
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");

  const utcDateTime = `${yyyy}-${MM}-${dd}T${hh}:${mm}Z`;
  return convertUtcToZonedTime(utcDateTime);
}
