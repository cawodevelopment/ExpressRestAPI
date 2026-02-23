import prisma from '../utils/client.js';

export const findAllTasks = async () => {
    return await prisma.task.findMany();
}

export const findTaskById = async (taskId, userId) => {
    return await prisma.task.findFirst({
        where: {
            id: taskId,
            userId: userId
        }
    });
}

export const createTask = async (taskData, userId) => {
    return await prisma.task.create({
        data: {
            title: taskData.title,
            description: taskData.description,
            userId: userId
        }
    });
}

export const updateTask = async (taskId, taskData, userId) => {
    return await prisma.task.updateMany({
        where: {
            id: taskId,
            userId: userId
        },
        data: {
            title: taskData.title,
            description: taskData.description
        }
    });
}

export const deleteTask = async (taskId, userId) => {
    await prisma.task.deleteMany({
        where: {
            id: taskId,
            userId: userId
        }
    });
}