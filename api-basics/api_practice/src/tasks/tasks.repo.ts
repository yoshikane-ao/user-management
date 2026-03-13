import { prisma } from "../db" ;

export async function createTask(input: {
    title: string;
    done: boolean;
    userId: number;
}) {
    return prisma.task.create({
        data: input,
    });
}

export async function findAllTask() {
  return prisma.task.findMany(
    {
    include: { user: true }
  }
);
}

    export async function deleteTask(id: number) {
        return prisma.task.delete({
        where: { id },
    });
}

export async function updateByTaskId(id: number, data:{ title?: string; done?: boolean; }) {
    return prisma.task.update({
        where: { id },
        data,
    });
}