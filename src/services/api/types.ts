export type LoginRequestDto = {
  email: string;
  password: string;
};

export type TokenReadDto = {
  accessToken: string;
  refreshToken: string;
};

export type MessageDto = {
  message: string;
};

export type ValidationError = {
  errors: Record<string, string[]>;
};

export type ApiError = MessageDto | ValidationError;

export function isValidationError(error: ApiError): error is ValidationError {
  return "errors" in error && "title" in error;
}
