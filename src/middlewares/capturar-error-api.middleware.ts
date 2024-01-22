import { ErrorRequestHandler } from "express";
import { APIError } from "../utils/APIError";

const capturarErrorAPI: ErrorRequestHandler = (error, req, res, next) => {
  if (!(error instanceof APIError)) {
    console.error(
      req.method,
      req.url,
      req.payload?.usuario ?? "(sin usuario)",
      error.message,
      req.body,
      error
    );
    res.status(500).send({
      error: {
        mensaje: error.message,
      },
    });
    return;
  }

  console.error(
    req.method,
    req.url,
    error.codigo_estado !== 401 ? req.payload?.usuario : "(sin usuario)",
    error
  );
  res.status(error.codigo_estado).send({
    error: {
      mensaje: error.mensaje,
      errores: error.errores,
    },
  });
  return;
};

export default capturarErrorAPI;
