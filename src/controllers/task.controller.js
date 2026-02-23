import * as tasksService from '../services/task.service.js';

export const getAllTasks = async (req, res) => {
    const tasks = await tasksService.getAllTasks(req.userId);
    res.status(200).json({
        success: true,
        data: tasks
    });
}

export const getTaskById = async (req, res) => {
    const task = await tasksService.getTaskById(req.params.id, req.userId);
    res.status(200).json({
        success: true,
        data: task
    });
}

export const createTask = async (req, res) => {
    const newTask = await tasksService.createTask(req.body, req.userId);
    res.status(201).json({
        success: true,
        data: newTask
    });
}

export const updateTask = async (req, res) => {
    const updatedTask = await tasksService.updateTask(req.params.id, req.body, req.userId);
    res.status(200).json({
        success: true,
        data: updatedTask
    });
}

export const deleteTask = async (req, res) => {
    await tasksService.deleteTask(req.params.id, req.userId);
    res.status(204).json({
        success: true,
        data: null
    });
}