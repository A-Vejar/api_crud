import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { APIError } from "../utils/APIError";

const transformarErrorValidacionZod: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (!(error instanceof ZodError)) {
    return next(error);
  }

  return next(
    APIError.badRequest(
      error.issues.map(
        (e) => (e.path.length > 0 ? `'${e.path}': ` : "") + `${e.message}.`
      )
    )
  );
};

export default transformarErrorValidacionZod;
