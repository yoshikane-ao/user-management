import { Router } from "express";
import { requireAuth, requireRole, AuthedRequest } from "../auth/auth.middleware";
import { findAll, findById, deleteUser } from "./users.repo"

export const usersRouter = Router();

usersRouter.get("/me", requireAuth, (req: AuthedRequest, res) => {
  res.status(200).json({ me: req.user });
});

usersRouter.get("/admin/secret", requireAuth, requireRole("admin"), (_req, res) => {
  res.status(200).json({ secret: "admin-only" });
});


usersRouter.get("/", requireAuth, async(req: AuthedRequest, res) => {
  const users = await findAll();
  res.status(200).json({ users });
});


usersRouter.get("/:id", requireAuth, async(req: AuthedRequest, res) => {
  const id = Number(req.params.id);
  const users = await findById(id);
  res.status(200).json({ users });
})

usersRouter.delete("/:id", requireAuth, async(req: AuthedRequest, res) => {
  const id = Number(req.params.id);
  const users = await deleteUser(id);
  res.status(200).json({ users });
});