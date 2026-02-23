import * as taskRepository from '../repositories/task.repository.js';
import HttpError from '../errors/http.error.js';

export const getAllTasks = async (userId) => {
    return await taskRepository.findAllTasks(userId);
}

export const getTaskById = async (taskId, userId) => {
    const task = await taskRepository.findTaskById(taskId, userId);
    if (!task) {
        throw new HttpError(404, 'Task not found');
    }
    return task;
}

export const createTask = async (taskData, userId) => {
    const newTask = await taskRepository.createTask(taskData, userId);

    if (!newTask) {
        throw new HttpError(400, 'Task creation failed');
    }

    return {
        id: newTask.id,
        title: newTask.title,
        description: newTask.description,
        completed: newTask.completed
    };
}

export const updateTask = async (taskId, taskData, userId) => {
    const updatedTask = await taskRepository.updateTask(taskId, taskData, userId);

    if (!updatedTask) {
        throw new HttpError(404, 'Task not found or update failed');
    }

    return updatedTask;
}

export const deleteTask = async (taskId, userId) => {
    await taskRepository.deleteTask(taskId, userId);
}
