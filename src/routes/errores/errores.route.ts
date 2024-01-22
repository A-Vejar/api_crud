import { Router } from "express";
import { APIError } from "../../utils/APIError";

const erroresRouter = Router();
erroresRouter.get("/:error_code", async (req, res, next) => {
  try {
    switch (req.params.error_code) {
      case "400":
        throw APIError.badRequest([]);
      case "401":
        throw APIError.unauthorized();
      case "403":
        throw APIError.forbidden();
      case "404":
        throw APIError.notFound();
      default:
        throw APIError.internalError();
    }
  } catch (error) {
    next(error);
  }
});

export = erroresRouter;
