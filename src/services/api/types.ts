export type LoginRequestDto = {
  email: string;
  password: string;
};

export type TokenReadDto = {
  accessToken: string;
  refreshToken: string;
};
