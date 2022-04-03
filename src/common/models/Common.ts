export type MessageDto = {
  message: string;
};

export interface ApiError extends Error {
  title: string;
  status: number;
  errors: Record<string, string[]>;
}
