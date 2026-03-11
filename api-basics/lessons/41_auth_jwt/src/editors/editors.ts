import { Router } from "express";
import { requireAuth, requireRole, AuthedRequest } from "../auth/auth.middleware";

export const editorRouter = Router();

editorRouter.get("/me", requireAuth, (req: AuthedRequest, res) => {
  res.status(200).json({ me: req.user });
});

editorRouter.get("/", (_req, res) => {
  res.status(200).json({ secret: "editor-only" });
});