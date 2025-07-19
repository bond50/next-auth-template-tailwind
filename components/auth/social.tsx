'use client';

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
    /**
     * Handles the click event for a social login button.
     * @param provider The social provider to sign in with.
     */
    const onClick = (provider: 'google' | 'github') => {
        signIn(provider, {
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    }

    return (
        <div className="flex w-full flex-col items-center gap-y-3">
            <Button
                // Improvement: Centered content for better visual balance
                className="w-full justify-center gap-x-3 transition-colors hover:bg-gray-50"
                size="lg"
                variant="outline"
                onClick={() => onClick('google')}
            >
                <FcGoogle className="h-5 w-5" />
                <span>Login with Google</span>
            </Button>

            <Button
                className="w-full justify-center gap-x-3 transition-colors hover:bg-gray-50"
                size="lg"
                variant="outline"
                onClick={() => onClick('github')}
            >
                <FaGithub className="h-5 w-5" />
                <span>Login with GitHub</span>
            </Button>
        </div>
    );
};