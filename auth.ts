import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import {db} from "@/lib/db";
import {getUserById} from "@/data/user";
import {getTwoFactorConfirmationByUserId} from "@/data/two-factor-confirmation";
import {getAccountByUserId} from "@/data/account";
import {UserRole} from "@prisma/client";

export const {auth, handlers, signIn, signOut} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({user}) {
            await db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()},
            });
        },
    },
    callbacks: {
        async signIn({user, account}) {
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            if (!user.id) return false;

            const existingUser = await getUserById(user.id);

            // Block credential sign-in without email verification
            if (!existingUser?.emailVerified) return false;

            // Require 2FA confirmation if enabled
            if (existingUser.isTwoFAEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
                if (!twoFactorConfirmation) return false;

                await db.twoFactorConfirmation.delete({
                    where: {id: twoFactorConfirmation.id},
                });
            }

            return true;
        },

        async jwt({token}) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);

            return {
                ...token,
                name: existingUser.name ?? null,
                email: existingUser.email ?? null,
                image: existingUser.image ?? null,
                role: existingUser.role,
                isTwoFAEnabled: existingUser.isTwoFAEnabled,
                isOAuth: !!existingAccount,
            };
        },

        async session({session, token}) {

            let userImage: string = "";
            if (typeof token.image === 'string') {
                userImage = token.image;
            } else if (token.image === null || token.image === undefined || typeof token.image === 'object' && Object.keys(token.image).length === 0) {
                userImage = "";
            }
            if (session.user) {
                session.user = {
                    ...session.user,
                    id: token.sub ?? "",
                    name: token.name ?? '',
                    email: token.email ?? '',
                    image: userImage,
                    role: token.role as UserRole,
                    isTwoFAEnabled: token.isTwoFAEnabled as boolean,
                    isOAuth: token.isOAuth as boolean,
                };
            }
            return session;
        },
    },

    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
});