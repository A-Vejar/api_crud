export class APIError extends Error {
  readonly mensaje: string;
  readonly errores: string[] | undefined;
  readonly codigo_estado: number;

  private constructor({
    mensaje,
    errores,
    codigoEstado,
  }: {
    mensaje: string;
    errores?: string[];
    codigoEstado: number;
  }) {
    super();
    this.mensaje = mensaje;
    this.errores = errores;
    this.codigo_estado = codigoEstado;
  }

  /** 400 - BAD REQUEST */
  static badRequest(errores: string[], mensaje = "La solicitud fue invalida.") {
    return new APIError({
      mensaje: mensaje,
      codigoEstado: 400,
      errores: errores,
    });
  }

  /** 401 - UNAUTHORIZED */
  static unauthorized(mensaje = "No autorizado. Requiere autenticación.") {
    return new APIError({
      mensaje,
      codigoEstado: 401,
    });
  }

  /** 403 - FORBIDDEN */
  static forbidden(
    mensaje = "No tiene los permisos necesarios para acceder al recurso."
  ) {
    return new APIError({
      mensaje,
      codigoEstado: 403,
    });
  }

  /** 404 - NOT FOUND */
  static notFound(mensaje = "No se encontró el recurso solicitado.") {
    return new APIError({
      mensaje: mensaje,
      codigoEstado: 404,
    });
  }

  /** 500 - INTERNAL ERROR - Error genérico. */
  static internalError(
    mensaje = "Ocurrió un error inesperado.",
    codigoEstado = 500
  ) {
    return new APIError({
      mensaje: mensaje,
      codigoEstado: codigoEstado,
    });
  }
}
