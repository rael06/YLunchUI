import { AccessToken } from "./types";
import jwt_decode from "jwt-decode";

export function parse(token: string) {
  var decoded = jwt_decode(token)
  return decoded as AccessToken;
}
