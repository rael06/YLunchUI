import { LoginRequestDto, TokenReadDto } from "./types";

const apiUrl = "https://ylunch-api.rael-calitro.ovh";

export async function loginApi(login: LoginRequestDto): Promise<void> {
  const res = await fetch(`${apiUrl}/authentication/login`, {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(login),
  });
  const tokenReadDto = await res.json();

  window.localStorage.setItem("accessToken", tokenReadDto.accessToken);
  window.localStorage.setItem("refreshToken", tokenReadDto.refreshToken);
}
