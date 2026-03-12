import * as bcrypt from "bcryptjs";
import { Prisma } from "../generated/prisma/client";
import { createUser } from "./users.repo";



export async function register(input: {
    name: string,
    email: string,
    password: string
}) {

    try {
        const passwordHash = await bcrypt.hash(input.password, 10);
        const existingUser = await findByEmail(input.email);
        if(existingUser) throw new HttpError (400, "REGISTER_FAILED", "Email already exists");

        const user = await createUser({
            name: input.name,
            email: input.email,
            passwordHash,
        });
    } catch (e) {
        if(
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
    )   {
        throw new HttpError(
            400,
            "VALIDATION_ERROR",
            "email already exists"
        );
    }

    throw e;
    }

    export async function findByIdUser(id: number) {
        return await findById(id);
    }

    export async function findAllusers() {
        return await findAll();
    }
}