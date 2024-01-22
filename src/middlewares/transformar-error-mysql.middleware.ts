import { ErrorRequestHandler } from "express";
import { MysqlError } from "mysql";
import { APIError } from "../utils/APIError";

const transformarErrorMySQL: ErrorRequestHandler = async (
  error: MysqlError,
  req,
  res,
  next
) => {
  if (!(error instanceof Error)) {
    return next(error);
  }

  if (error.errno !== undefined) {
    const errorState = Number(error.errno);

    if (errorState === 1064) {
      return next(APIError.badRequest([error.message]));
    }
    if (errorState === 1146) {
      return next(APIError.notFound(error.message));
    }
  }

  return next(APIError.internalError(error.message));
};

export default transformarErrorMySQL;
