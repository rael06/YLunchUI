import { ApiError } from "../../models/Common";
import { parse } from "../JwtToken";
import { getLocalStorageItem, removeLocalStorageItem } from "../localStorage";
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
  if (Date.now() + 3 * 60 * 1000 > accessTokenData.exp * 1000) {
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

  if (response.status === 401) {
    removeLocalStorageItem("accessToken");
    removeLocalStorageItem("refreshToken");
  }

  const error = (await response.json()) as ApiError;
  throw error;
}
