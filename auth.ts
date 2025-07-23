import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import {db} from "@/lib/db";
import {getUserById} from "@/data/user";
import {getTwoFactorConfirmationByUserId} from "@/data/two-factor-confirmation";

export const {auth, handlers, signIn, signOut} = NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/error'
    },
    events: {
        async linkAccount({user}) {
            await db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn({user, account}) {

            //Allow Oauth without email verification
            if (account?.provider !== 'credentials') return true;
            const existingUser = await getUserById(user.id);
            if (!existingUser?.emailVerified) return false

            if (existingUser.isTwoFAEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
                if (!twoFactorConfirmation) return false
                //Delete the two factor confirmation for te next login
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    }
                });

            }
            return true;

        },
        async session({session, token}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role
            }
            if (session.user) {
                session.user.isTwoFAEnabled = token.isTwoFAEnabled
            }
            return session;
        },

        async jwt({token}) {
            if (!token.sub) return token
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            token.role = existingUser.role
            token.isTwoFAEnabled = existingUser.isTwoFAEnabled;

            return token;
        }


    },

    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
})