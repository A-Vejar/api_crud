import "dotenv/config";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { APIError } from "../utils/APIError";
import { TokenPayload } from "../global";

const { JWT_ACCESS_TOKEN_SECRET } = process.env;

const verificarTokenAcceso: RequestHandler = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return next(APIError.unauthorized());
  }

  const tokenAcceso = authorizationHeader.replace("Bearer ", "");
  if (!tokenAcceso) {
    return next(APIError.unauthorized());
  }

  try {
    const payload: unknown = jwt.verify(tokenAcceso, JWT_ACCESS_TOKEN_SECRET);
    req.payload = payload as TokenPayload;

    return next();
  } catch (error) {
    return next(
      APIError.unauthorized(
        `El token de acceso no es valido${
          error instanceof Error && ` (motivo: ${error.message}).`
        }.`
      )
    );
  }
};

export default verificarTokenAcceso;
