import {useSession} from "next-auth/react";


export const useCurrentRole = () => {
    const userSession = useSession();
    return userSession.data?.user.role

}