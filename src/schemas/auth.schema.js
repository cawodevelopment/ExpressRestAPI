import {z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .email()
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(6)
        .trim()
});

export const registerSchema = z.object({
    email: z
        .string()
        .email()
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(6)
        .trim(),
    name: z
        .string()
        .min(2)
        .max(100)
        .toLowerCase()
        .trim()
});