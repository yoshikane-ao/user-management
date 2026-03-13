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

// export async function getUser() {
//     //処理
//     // return prisma.user.findFirst
//     // ID1のユーザーを返すgetUser関数
//     const user = await prisma.user.findUnique({
//     where: { id: 1 },
//     });
//     return user;
// }

export async function findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
}

export async function findAll() {
  return prisma.user.findMany();
}


    export async function findByIdUser(id: number) {
    return await prisma.user.findUnique({
        where: { id },
    });
}

    export async function deleteUser(id: number) {
        return prisma.user.delete({
        where: { id },
    });
}

export async function updateById(id: number, data:{ name?: string; email?: string; }) {
    return prisma.user.update({
        where: { id },
        data,
    });
}
