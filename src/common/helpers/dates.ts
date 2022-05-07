import { format, toDate } from "date-fns-tz";

export function convertUtcToZonedDateTime(utc: Date) {
  console.log(new Date(utc).toUTCString());

  return format(toDate(utc), "dd/MM/yyyy HH:mm:ss zzz", {
    timeZone: "Europe/Paris",
  });
}
