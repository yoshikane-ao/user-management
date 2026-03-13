import * as bcrypt from "bcryptjs";
import { Prisma } from "../generated/prisma/client";
import * as repo from "./users.repo"; 
// import { HttpError } from "../lib/error";


export class HttpError extends Error {
    status: number;
    code: string;
    constructor(status: number, code:string, message: string) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

export async function register(input: {
    name: string,
    email: string,
    password: string
}) {
    try {
        const existingUser = await repo.findByEmail(input.email);
        if (existingUser) {
            throw new HttpError(400, "REGISTER_FAILED", "このメールアドレスは既に登録されています。");
        }
        const passwordHash = await bcrypt.hash(input.password, 10);

        const user = await repo.createUser({
            name: input.name,
            email: input.email,
            passwordHash,
        });
        return user;

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
            throw new HttpError(
                400,
                "VALIDATION_ERROR",
                "email already exists"
            );
        }
        throw e;
    }
}

// export async function findByIdUser(id: number) {
//     // const user = await repo.findById(id);
//     if (!user) throw new HttpError(404, "NOT_FOUND", "ユーザーが見つかりません");
//     return user;
// }

export async function findByIdUsers(id: number) {
    return await repo.findByIdUser(id);
}

export async function findAllusers() {
    return await repo.findAll();
}

export async function deleteUser(id: number) {
    return await repo.deleteUser(id);
}

export async function updateById(id: number, data:{ name?: string; email?: string;}) {
    return await repo.updateById(id, data);
}