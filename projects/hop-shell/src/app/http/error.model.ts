export type ApiError = {
  code: string;
  message: string;
  validation?: { field: string; message: string }[];
};
