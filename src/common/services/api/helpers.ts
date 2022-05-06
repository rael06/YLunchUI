import { subMinutes } from "date-fns";
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
  if (accessTokenData.exp * 1000 < subMinutes(new Date(), 1).getTime()) {
    await refreshTokensApi();
    accessToken = getLocalStorageItem("accessToken");
  }

  headers.set("Authorization", `Bearer ${accessToken}`);
  return headers;
}

export async function processResponse<TResponseDto>(response: Response) {
  if (response.status < 400) {
    try {
      const data = await response.json();
      return data as TResponseDto;
    } catch {
      return {} as TResponseDto;
    }
  }
  const error = (await response.json()) as ApiError;
  throw error;
}
