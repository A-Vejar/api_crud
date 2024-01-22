import { Router } from "express";
import { schemaDeleteUsuario, schemaGetUsuario, schemaPatchUsuario, schemaPostUsuario } from "../schemas/usuarios.schema";
import { deleteUsuario, getUsuario, getUsuarios, patchUsuario, postUsuario } from "../models/usuarios.model";

const indexRouter = Router();

indexRouter.get("/:id", async (req, res, next) => {
  try {
    const data = schemaGetUsuario.parse(req.params);
    return res.send({
      data: await getUsuario(data)
    });
  } catch (error) {
    next(error);
  }
});

indexRouter.get("/", async (req, res, next) => {
  try {
    return res.send({
      data: await getUsuarios()
    });
  } catch (error) {
    next(error);
  }
});

indexRouter.post("/", async (req, res, next) => {
  try {
    const data = schemaPostUsuario.parse({ ...req.body, created_by: 'admin' });
    return res.send({
      data: await postUsuario(data)
    });
  } catch (error) {
    next(error);
  }
});

indexRouter.patch("/:id", async (req, res, next) => {
  try {
    const data = schemaPatchUsuario.parse({ ...req.body, id: req.params.id, updated_by: 'admin' });
    return res.send({
      data: await patchUsuario(data)
    });
  } catch (error) {
    next(error);
  }
});

indexRouter.delete("/:id", async (req, res, next) => {
  try {
    const data = schemaDeleteUsuario.parse({ ...req.params, deleted_by: 'admin' });
    return res.send({
      data: await deleteUsuario(data)
    });
  } catch (error) {
    next(error);
  }
});

export = indexRouter;
