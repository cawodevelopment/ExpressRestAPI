import {z} from 'zod';

export const createTaskSchema = z.object({
    title: z
        .string()
        .min(1)
        .max(255),
    description: z
        .string()
        .max(1000)
        .optional(),
});

export const updateTaskSchema = z.object({
    title: z
        .string()
        .min(1)
        .max(255)
        .toLowerCase()
        .optional(),
    description: z
        .string()
        .max(1000)
        .optional(),
    completed: z
        .boolean()
        .optional()
});