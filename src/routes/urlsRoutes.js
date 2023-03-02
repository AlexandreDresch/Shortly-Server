import { Router } from "express";

import { createShortenedUrl } from "../controllers/urlController.js";

import schemaValidation from "../middlewares/schemaValidation.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

import { urlSchema } from "../schemas/urlSchemas.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  tokenValidation,
  schemaValidation(urlSchema),
  createShortenedUrl
);

export default urlsRouter;
