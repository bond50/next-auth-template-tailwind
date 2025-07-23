'use server'
import * as z from 'zod'
import {db} from "@/lib/db";
import {settingsSchema} from "@/schemas";
import {getUserById} from "@/data/user";
import {currentUser} from "@/lib/auth";

export const settings = async (values: z.infer<typeof settingsSchema>) => {
    const user = await currentUser();
    if (!user) {
        return {error: 'Unauthorized'};
    }
    const existingUser = await getUserById(user.id);
    if (!existingUser) {
        return {error: 'User not found'};
    }
    await db.user.update({
        where: {id: existingUser.id},
        data: {
            ...values
        }
    })
    return {success: 'Settings updated successfully'}
}




