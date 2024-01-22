import { DateTime } from "luxon";
import { z } from "zod";

/**
 * Un identificador de base de datos como un valor de tipo number entero y
 * positivo
 */
export const idSchema = z.coerce
  .number()
  .int()
  .positive()
  .max(Number.MAX_SAFE_INTEGER);

/**
 * Un usuario de base de datos como un valor de tipo string con un largo entre 1 y 10 caracteres
 */
export const usuarioSchema = z.string().min(1).max(10);

/**
 * Una fecha como un valor de tipo string en formato ISO-8601 (UTC).
 */
export const fechaISOSchema = z.preprocess((d) => {
  try {
    if (typeof d !== "string" || !DateTime.fromISO(d).isValid) {
      throw new Error();
    }
    return DateTime.fromISO(d, { zone: "utc" }).toISO();
  } catch (error) {}
  return d;
}, z.string().datetime());

export const booleanComoStringSchema = z
  .enum(["true", "false"])
  .transform((b) => b === "true");

/**
 * Verifica que el objeto tenga al menos una propiedad
 * @param {Object} arg
 * @param {z.RefinementCtx} ctx
 */
export const requerirPropiedadObjetoRefinement: z.Refinement<any> = (
  arg,
  ctx
) => {
  if (
    Object.keys(arg).length === 0 ||
    Object.keys(arg).every((key) => arg[key] === undefined)
  ) {
    ctx.addIssue({
      code: "custom",
      message: "Debe indicar al menos un parámetro para actualizar el recurso",
    });
  }
};
