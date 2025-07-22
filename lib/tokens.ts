import {nanoid} from 'nanoid'
import {getVerificationTokenByEmail} from "@/data/verification-token";
import {db} from "@/lib/db";

export const generateVerificationToken = async (email: string) => {
    const token = nanoid(12);
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