import { Router } from "express";

import { createShortenedUrl, deleteUrl, getShortenedUrlById, redirectUrl } from "../controllers/urlController.js";

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
urlsRouter.get("/urls/:id", getShortenedUrlById);
urlsRouter.get("/urls/open/:shortUrl", redirectUrl);
urlsRouter.delete("/urls/:id", tokenValidation, deleteUrl)

export default urlsRouter;
