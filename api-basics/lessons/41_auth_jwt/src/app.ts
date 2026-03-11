import express from "express";
import { authRouter } from "./auth/auth.routes";
import { usersRouter } from "./users/users.routes";

export function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  return app;
}