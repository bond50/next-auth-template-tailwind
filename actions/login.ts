'use server'
import * as z from 'zod'
import {loginSchema} from "@/schemas";
import {signIn} from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {AuthError} from "next-auth";
import {generateTwoFactorToken, generateVerificationToken} from "@/lib/tokens";
import {getUserByEmail} from "@/data/user";
import {sendTwoFactorEmail, sendVerificationEmail} from "@/lib/mail";
import {getTwoFactorTokenByEmail} from "@/data/two-factor-token";
import {db} from "@/lib/db";
import {getTwoFactorConfirmationByUserId} from "@/data/two-factor-confirmation";


export const login = async (values: z.infer<typeof loginSchema>) => {

    const validatedFields = loginSchema.safeParse(values)
    if (!validatedFields.success) {
        return {error: "Invalid fields !"}
    }
    const {email, password, code} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "Email does not exist!"}
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return {success: 'Confirmation email sent!'}

    }
    if (existingUser.isTwoFAEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
            if (!twoFactorToken) {
                return {error: "Invalid token"}
            }
            if (twoFactorToken.token !== code) {
                return {error: "Invalid token"}
            }
             const hasExpired = new Date(twoFactorToken.expires) <new Date()
            if (hasExpired) {
                return {error: "Code expired!"}
            }

            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id
                }
            })

            const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
            if (existingTwoFactorConfirmation) {
                // Delete the existing two factor confirmation
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingTwoFactorConfirmation.id
                    }
                })
            }
            // Create a new two factor confirmation
            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                }
            })


        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
            await sendTwoFactorEmail(existingUser.email, twoFactorToken.token)
            return {
                twoFactorRequired: true
            }
        }

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