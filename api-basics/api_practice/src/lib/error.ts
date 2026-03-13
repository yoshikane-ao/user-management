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

// export function HttpError()

//   if (users.some((u) => u.email === email)) {
//     return res.status(400).json(validationError("email already exists", [{ field: "email", reason: "duplicate" }]));
//   }
//     res.status(400).json({ item: email});