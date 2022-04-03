import {
  LoginRequestDto,
  RefreshTokensRequestDto,
  UserReadDto,
} from "../../models/Authentication";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../localStorage";
import { TokenReadDto } from "./../../models/Authentication";
import { ApiError } from "./../../models/Common";
import {
  apiUrl,
  getAnonymousHeaders,
  getAuthorizedHeaders,
  processResponse,
  restMethods,
} from "./helpers";

export async function loginApi(login: LoginRequestDto): Promise<void> {
  return fetch(`${apiUrl}/authentication/login`, {
    method: restMethods.post,
    headers: getAnonymousHeaders(),
    body: JSON.stringify(login),
  })
    .then(async (response) => await processResponse<TokenReadDto>(response))
    .then((data: TokenReadDto) => {
      setLocalStorageItem("accessToken", data.accessToken);
      setLocalStorageItem("refreshToken", data.refreshToken);
    })
    .catch((error: ApiError) => {
      removeLocalStorageItem("accessToken");
      removeLocalStorageItem("refreshToken");
      throw error;
    });
}

export async function refreshTokensApi(): Promise<void> {
  const accessToken = getLocalStorageItem("accessToken");
  const refreshToken = getLocalStorageItem("refreshToken");
  if (!accessToken || !refreshToken) {
    return;
  }

  const body: RefreshTokensRequestDto = { accessToken, refreshToken };

  return fetch(`${apiUrl}/authentication/refresh-tokens`, {
    method: restMethods.post,
    headers: getAnonymousHeaders(),
    body: JSON.stringify(body),
  })
    .then(async (response) => await processResponse<TokenReadDto>(response))
    .then((data: TokenReadDto) => {
      setLocalStorageItem("accessToken", data.accessToken);
      setLocalStorageItem("refreshToken", data.refreshToken);
    })
    .catch((error: ApiError) => {
      removeLocalStorageItem("accessToken");
      removeLocalStorageItem("refreshToken");
      throw error;
    });
}

export async function getCurrentUserApi(): Promise<UserReadDto> {
  return fetch(`${apiUrl}/authentication/current-user`, {
    method: restMethods.get,
    headers: await getAuthorizedHeaders(),
  }).then(async (response) => await processResponse(response));
}
