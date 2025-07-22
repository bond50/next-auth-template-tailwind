'use server'
import {resetSchema} from "@/schemas";
import {db} from '@/lib/db'
import {getUserByEmail} from "@/data/user";
import * as z from 'zod'

export const reset = async (values:z.infer<typeof  resetSchema>) => {
    const validatedValues = resetSchema.safeParse(values);
    if (!validatedValues.success) {
        return {error: 'Invalid Email'};
    }
    const {email} = validatedValues.data;
    const user = await getUserByEmail(email);
    if (!user) {
        return {error: 'Email not found'};
    }

    //TODO: Implement reset password logic here, e.g., send reset link to email

return {success: 'Reset link sent to your email'};
}