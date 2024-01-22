import { Request, Response } from "express";

export interface TokenPayload {
  /** El usuario que realiza la solicitud. */
  usuario: string;

  /** El RUT del usuario que realiza la solicitud. */
  rut: string;

  /** El identificador del token. */
  jti: string;

  /** La fecha de expiración del token. */
  exp: string;

  /** La fecha de firma del token. */
  iat: string;
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      API_ENV: "DEV" | "PROD";
      PORT: number;
      DB_HOST: string;
      DB_USER: string;
      DB_PASS: string;
      DB_NAME: string;
      JWT_ACCESS_TOKEN_SECRET: string;
    }
  }

  namespace Express {
    export interface Request {
      payload: TokenPayload;
    }
  }
}
