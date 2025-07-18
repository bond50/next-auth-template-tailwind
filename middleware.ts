import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import {apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes} from "@/routes";


const {auth} = NextAuth(authConfig)
export default auth((req) => {
    const {nextUrl} = req
    const isLoggedIn = !!req.auth
    const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isAPIAuthRoute) {
        return null
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null
    }
    if (!isLoggedIn && !isPublicRoute) {
        // If the user is not logged in and the route is not public, redirect to the login page
        return Response.redirect(new URL(`/auth/login?callbackUrl=${nextUrl.pathname}`, nextUrl))
    }

    return null


})


export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}