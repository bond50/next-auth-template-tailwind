'use server'

import {currentRole} from "@/lib/auth";
import {UserRole} from "@prisma/client";

export const adminAction = async () => {
    const role = await currentRole();
    if (role !== UserRole.ADMIN) {
        return {
            error: 'You do not have permission to perform this action.'
        }

    }
    return {
        success: 'Admin action performed successfully.'
    }
}