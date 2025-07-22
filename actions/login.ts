'use server'
import * as z from 'zod'
import {loginSchema} from "@/schemas";
import {signIn} from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {AuthError} from "next-auth";
import {generateVerificationToken} from "@/lib/tokens";
import {getUserByEmail} from "@/data/user";
import {sendVerificationEmail} from "@/lib/mail";

export const login = async (values: z.infer<typeof loginSchema>) => {

    const validatedFields = loginSchema.safeParse(values)
    if (!validatedFields.success) {
        return {error: "Invalid fields !"}
    }
    const {email, password} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "Email does not exist!"}
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return {success: 'Confirmation email sent!'}

    }


    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        return {success: 'Login successful!'}

    } catch (e) {

        if (e instanceof AuthError) {
            switch (e.type) {
                case "CredentialsSignin":
                    return {error: "Invalid email or password !"}
                default:
                    return {error: "An error occurred during login !"}
            }
        }
        throw e
    }
}