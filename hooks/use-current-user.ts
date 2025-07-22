import {useSession} from "next-auth/react";


export const useCurrentUser = () => {
    const userSession = useSession();
    return userSession.data?.user

}