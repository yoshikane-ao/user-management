import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { config } from "../config";
import { createUser, findByEmail } from "../users/users.repo";
import { Prisma } from "../generated/prisma";

export class HttpError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export type JwtPayload = {
  sub: number;
};

export async function login(email: string, password: string) {
  const user = await findByEmail(email);
  if (!user) {
    throw new HttpError(401, "AUTH_FAILED", "Invalid email or password");
  }

  const ok = await bcrypt.compare(password, user.passwordHash); 

  if (!ok) {
    throw new HttpError(401, "AUTH_FAILED", "Invalid email or password");
  }

  const payload: JwtPayload = {
    sub: user.id,
  };

  const token = config.jwtExpiresIn
    ? jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn })
    : jwt.sign(payload, config.jwtSecret);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
