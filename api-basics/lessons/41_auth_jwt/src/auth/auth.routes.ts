import { Router, Request, Response, NextFunction } from "express";
import * as service from "./auth.service";
import { users } from "../users/users.store";
import { error } from "node:console";
import { requireAuth } from "./auth.middleware"


export const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    const body = (req.body ?? {}) as { email?: string; password?: string };
    const { email, password } = body;

    if (!email || !password) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "email and password are required" } });
      return;
    }

    const result = await service.login(email, password);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

authRouter.post("/register", async (_req, res, next) => {
  try {
    const { name, email, password, role } = _req.body;
    const input ={
      name, email, password
    }
    if(!name || !email || !password || !role) {
        res.status(400).json({ error: { code : "VALIDATION_ERROR", message: "ALL fields"}})
    }

    if (!email || !password) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "email and password are required" } });
      return;
    }

    const result = await service.register(input);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});
