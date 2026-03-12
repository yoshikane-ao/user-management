import * as bcrypt from "bcryptjs";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../db" ;

export async function createUser(input: {
    name: string;
    email: string;
    passwordHash: string;
}) {
    return prisma.user.create({
        data: input,
    });
}

export async function register(input: {
    name: string,
    email: string,
    password: string
}) {
    const password = await bcrypt.hash(input.password, 10);
}