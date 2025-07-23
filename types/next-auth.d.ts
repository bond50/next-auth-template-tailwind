//types/next-auth.d.ts

import { type DefaultSession } from "next-auth";
import {UserRole} from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: "ADMIN" | "USER";
      isTwoFAEnabled: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role: "ADMIN" | "USER";
     isTwoFAEnabled: boolean;
  }
}

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
   isTwoFAEnabled: boolean;
}