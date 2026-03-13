import express from "express";
import { authRouter } from "../src/auth/auth.routes";
import { usersRouter } from "../src/users/users.routes";
import { tasksRouter } from "../src/tasks/tasks.routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

export function buildApp() {
  const app = express();
  app.use(helmet());
  const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
});
app.use(limiter);
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/tasks", tasksRouter);
  return app;
}