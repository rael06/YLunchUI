import subSeconds from "date-fns/subSeconds";
import { ApiError } from "../../models/Common";
import { parse } from "../JwtToken";
import { getLocalStorageItem } from "../localStorage";
import { refreshTokensApi } from "./authentication";

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
  let accessToken = getLocalStorageItem("accessToken");
  if (!accessToken) return headers;

  const accessTokenData = parse(accessToken);
  if (accessTokenData.exp < subSeconds(new Date(), 30).getTime()) {
    await refreshTokensApi();
    accessToken = getLocalStorageItem("accessToken");
  }

  headers.set("Authorization", `Bearer ${accessToken}`);
  return headers;
}

export async function processResponse<TResponseDto>(response: Response) {
  const data = await response.json();
  if (response.ok) {
    return data as TResponseDto;
  }
  const error = data as ApiError;
  throw error;
}
