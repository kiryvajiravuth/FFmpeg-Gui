export type ErrorCode = "INVALID_REQUEST" | "NOT_FOUND" | "INTERNAL";

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: ErrorCode,
    message?: string
  ) {
    super(message || code);
  }
}

export function badRequest(message?: string): HttpError {
  return new HttpError(400, "INVALID_REQUEST", message);
}

export function notFound(message?: string): HttpError {
  return new HttpError(404, "NOT_FOUND", message);
}

export function internal(message?: string): HttpError {
  return new HttpError(500, "INTERNAL", message);
}
