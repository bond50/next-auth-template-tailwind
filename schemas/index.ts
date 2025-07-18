import * as z from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1, {error: "Password is required"}),
});

export const registerSchema = z.object({
    email: z.email(),
    name: z.string().min(1, {error: "Name is required"}),
    password: z.string().min(6, {error: "Minimum password length is 6 characters"}),
});
