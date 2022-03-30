import subSeconds from "date-fns/subSeconds";
import { parse } from "../JwtToken";
import * as localStorage from "../localStorage";
import { getNewTokens } from "./authentication";
import { ApiError, ErrorDto } from "../../models/Common";

// export const apiUrl = "http://localhost:5254";
export const apiUrl = "https://ylunch-api.rael-calitro.ovh";

type RestMethod = "post" | "get" | "patch" | "put" | "delete";

export const restMethods: Record<RestMethod, RestMethod> = {
  post: "post",
  get: "get",
  patch: "patch",
  put: "put",
  delete: "delete",
};

export function getAnonymousHeaders() {
  return new Headers({
    "Content-Type": "application/json",
  });
}

export async function getAuthorizedHeaders() {
  const headers = getAnonymousHeaders();
  let accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return headers;

  const accessTokenData = parse(accessToken);
  if (accessTokenData.exp < subSeconds(new Date(), 30).getTime()) {
    await getNewTokens();
    accessToken = localStorage.getItem("accessToken");
  }

  headers.set("Authorization", `Bearer ${accessToken}`);
  return headers;
}

export async function assertSuccess(response: Response) {
  if (response.status < 400) {
    return;
  }
  const errorDto = (await response.json()) as ErrorDto;
  const { title, status, errors } = errorDto;
  const error = { message: title, title, status, errors } as ApiError;
  throw error;
}
