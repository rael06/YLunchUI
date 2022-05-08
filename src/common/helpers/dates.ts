import { format, toDate } from "date-fns-tz";

export function convertUtcToZonedDateTime(utc: string) {
  return format(toDate(utc + "Z"), "dd/MM/yyyy HH:mm:ss zzz", {
    timeZone: "Europe/Paris",
  });
}
