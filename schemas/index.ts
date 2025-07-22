import * as z from "zod";

export const loginSchema = z.object({
    email: z.email().min(1, {error: "Email is required"}),
    password: z.string().min(1, {error: "Password is required"}),
    code: z.string().optional(),
});
export const resetSchema = z.object({
    email: z.email().min(1, {error: "Email is required"}),

});

export const registerSchema = z.object({
    email: z.email().min(1, {error: "Email is required"}),
    name: z.string().min(1, {error: "Name is required"}),
    password: z.string().min(6, {error: "Minimum password length is 6 characters"}),
});
export const newPasswordSchema = z.object({
    password: z.string().min(6, {error: "Minimum password length is 6 characters"}),
});