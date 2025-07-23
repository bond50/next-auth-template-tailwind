//types/next-auth.d.ts

import {type DefaultSession} from "next-auth";
import {UserRole} from "@prisma/client";


declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string | null;
            email: string | null;
            image: string ;
            role: UserRole;
            isTwoFAEnabled: boolean;
            isOAuth: boolean;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        sub?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role: UserRole;
        isTwoFAEnabled: boolean;
        isOAuth: boolean;
    }
}
export type ExtendedUser = DefaultSession["user"] & {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: UserRole;
    isTwoFAEnabled: boolean;
    isOAuth: boolean;
}