import {nanoid} from 'nanoid'
import {getVerificationTokenByEmail} from "@/data/verification-token";
import {db} from "@/lib/db";
import {getPasswordResetTokenByEmail} from "@/data/password-reset-token";



export const generatePasswordResetToken = async (email: string) => {
    const token = nanoid(32);
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hour from now

    const existingToken = await getPasswordResetTokenByEmail(email)
    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return passwordResetToken;
}
export const generateVerificationToken = async (email: string) => {
    const token = nanoid(32);
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hour from now

    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });


    return verificationToken;


}