'use server'
import {resetSchema} from "@/schemas";

import {getUserByEmail} from "@/data/user";
import * as z from 'zod'
import {generatePasswordResetToken} from "@/lib/tokens";
import {sendPasswordResetEmail} from "@/lib/mail";

export const reset = async (values: z.infer<typeof resetSchema>) => {
    const validatedValues = resetSchema.safeParse(values);
    if (!validatedValues.success) {
        return {error: 'Invalid Email'};
    }
    const {email} = validatedValues.data;
    const user = await getUserByEmail(email);
    if (!user) {
        return {error: 'Email not found'};
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    if (!passwordResetToken) {
        return {error: 'Failed to generate reset token'};
    }

    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.passwordResetToken);


    return {success: 'Reset link sent to your email'};
}