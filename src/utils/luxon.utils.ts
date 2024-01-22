import { DateTime } from "luxon";

/**
 * Las columnas de tipo Datetime obtenidas como resultado de un llamado a procedimiento son transformadas
 * por la librería 'mssql' a objetos de tipo Date (javascript).
 * A la fecha de este commit, no existe una manera limpia y soportada por typescript de modificar
 * este comportamiento, por lo que, si necesita realizar calculos con fechas obtenidas desde base de datos
 * deberá primero convertilas con el método 'fromJSDateUTC'.
 *
 * Otro problema ocurre al comparar las fechas de base de datos con la fecha actual, ya que
 * la fecha de base de datos está en UTC, pero la actual, generada por DateTime.now(), incluye la zona horaria local.
 * Para esto se tiene el método 'nowUTC'.
 *
 * Cabe destacar que no es necesario convertir cada una de las fechas obtenidas desde base de datos
 * antes de enviarlas en la respuesta de una solicitud, ya que 'mssql' ya las entrega en el formato deseado.
 */
export const luxonUtils = {
  /** Crea un objeto DateTime a partir de un objeto Date que indica una fecha con zona horaria UTC. */
  fromJSDateUTC: (date: Date) => DateTime.fromJSDate(date, { zone: "utc" }),

  /** Crea un objeto DateTime a partir de la fecha actual, manteniendo su tiempo local y forzando su zona horaria a UTC. */
  nowUTC: () =>
    DateTime.now().setZone("utc", {
      keepLocalTime: true,
    }),
};
