import { z } from "zod";
import { idSchema } from "./common.schema";

// GET with filters
export const schemaGetUsuario = z.object({
    id: idSchema
}).strict();

// POST
export const schemaPostUsuario = z.object({
    nombre: z.string(),
    apellido_paterno: z.string(),
    apellido_materno: z.string(),
    fecha_nacimiento: z.string(),
    correo: z.string().optional(),
    telefono: z.coerce.number().optional(),
    created_by: z.string()
}).strict();

// PATCH
export const schemaPatchUsuario = z.object({
    id: idSchema,
    nombre: z.string().optional(),
    apellido_paterno: z.string().optional(),
    apellido_materno: z.string().optional(),
    fecha_nacimiento: z.string().optional(),
    correo: z.string().optional(),
    telefono: z.coerce.number().optional(),
    updated_by: z.string()
}).strict();

// DELETE
export const schemaDeleteUsuario = z.object({
    id: idSchema,
    deleted_by: z.string()
}).strict();