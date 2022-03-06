import subSeconds from "date-fns/subSeconds";
import { parse } from "../jwtToken";
import * as localStorage from "../localStorage";
import { ApiError, LoginRequestDto } from "./types";

// const apiUrl = "http://localhost:5254";
const apiUrl = "https://ylunch-api.rael-calitro.ovh";

type RestMethod = "post" | "get" | "patch" | "put" | "delete";

const restMethods: Record<RestMethod, RestMethod> = {
  post: "post",
  get: "get",
  patch: "patch",
  put: "put",
  delete: "delete",
};

function getAnonymousHeaders() {
  return new Headers({
    "Content-Type": "application/json",
  });
}

async function getAuthorizedHeaders() {
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

async function assertSuccess(response: Response) {
  if (response.status < 400) {
    return;
  }
  const error = await response.json();
  throw error as ApiError;
}

export async function loginApi(login: LoginRequestDto): Promise<void> {
  const response = await fetch(`${apiUrl}/authentication/login`, {
    method: restMethods.post,
    headers: getAnonymousHeaders(),
    body: JSON.stringify(login),
  });

  await assertSuccess(response);

  const TokenReadDto = await response.json();
  localStorage.setItem("accessToken", TokenReadDto.accessToken);
  localStorage.setItem("refreshToken", TokenReadDto.refreshToken);
}

export async function getNewTokens(): Promise<void> {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await fetch(`${apiUrl}/authentication/refresh-tokens`, {
    method: restMethods.post,
    headers: getAnonymousHeaders(),
    body: JSON.stringify({ accessToken, refreshToken }),
  });

  await assertSuccess(response);

  const tokenReadDto = await response.json();
  localStorage.setItem("accessToken", tokenReadDto.accessToken);
  localStorage.setItem("refreshToken", tokenReadDto.refreshToken);
}
