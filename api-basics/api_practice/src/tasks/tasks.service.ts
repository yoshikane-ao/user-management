import { Prisma } from "../generated/prisma/client";
import * as repo from "./tasks.repo"; 
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

export async function create(input: {
    title: string,
    done: boolean,
    userId: number;
}) {
    try {

        const user = await repo.createTask({
            title: input.title,
            done: input.done,
            userId: input.userId
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

export async function findAllTask() {
    return await repo.findAllTask();
}

export async function deleteTask(id: number) {
    return await repo.deleteTask(id);
}

export async function updateById(id: number, data:{ title?: string; done?: boolean;}) {
    return await repo.updateByTaskId(id, data);
}