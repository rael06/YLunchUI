export type LoginRequestDto = {
  email: string;
  password: string;
};

export type TokenReadDto = {
  accessToken: string;
  refreshToken: string;
};

export type UserReadDto = {
  email: string;
  phoneNumber: string;
  firstname: string;
  lastname: string;
  roles: string[];
  id: string;
};
