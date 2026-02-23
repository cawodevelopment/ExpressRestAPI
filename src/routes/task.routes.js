import express from 'express';
import authenticate from '../middlewares/authentication.middleware.js';
import validate from '../middlewares/input-sanitisation.middleware.js';
import * as taskController from '../controllers/task.controller.js';
import {createTaskSchema, updateTaskSchema} from '../schemas/task.schema.js';


const router = express.Router();

router.route('/')
    .get(authenticate, taskController.getAllTasks)
    .post(validate(createTaskSchema), authenticate, taskController.createTask);

router.route('/:id')
    .get(authenticate, taskController.getTaskById)
    .put(validate(updateTaskSchema), authenticate, taskController.updateTask)
    .delete(authenticate, taskController.deleteTask);

export default router;