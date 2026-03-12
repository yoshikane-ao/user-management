export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    details?: { field: string; reason: string }[];
  };
};

export function validationError(message: string, details: { field: string; reason: string }[] = []): ApiErrorBody {
  return { error: { code: "VALIDATION_ERROR", message, details } };
}