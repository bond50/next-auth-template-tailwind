/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication and are reachable by both
 * authenticated and unauthenticated users.
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    '/'
];

/**
 * An array of routes used for authentication flows, such as login and registration.
 * - Unauthenticated users are allowed to access these pages.
 * - Authenticated users who try to access these pages will be redirected to the
 * path defined in `DEFAULT_LOGIN_REDIRECT`.
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/auth/register",
    "/auth/login",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/verify-email",
];

/**
 * The prefix for all API routes used by NextAuth.js for authentication.
 * Any route starting with this prefix (e.g., "/api/auth/signin", "/api/auth/callback/google")
 * is treated as an API endpoint for the authentication process.
 * The middleware will not apply any protection logic to these routes.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default path to redirect users to after a successful login.
 * This is also the path where already authenticated users are sent if they attempt
 * to visit an authentication route (e.g., the login page).
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";