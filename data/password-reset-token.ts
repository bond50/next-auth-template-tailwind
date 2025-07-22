import {db} from '@/lib/db'


export const getResetTokenByToken = async (token: string) => {
    try {
        return await db.passwordResetToken.findUnique({
            where: {
                token: token
            }
        })

    } catch (e) {
        console.error('Error fetching reset token:', e);
        return null
    }

}


export const getResetTokenByEmail = async (email: string) => {
    try {
        return await db.passwordResetToken.findFirst({
            where: {
                email
            }
        })

    } catch (e) {
        console.error('Error fetching reset token:', e);
        return null
    }

}