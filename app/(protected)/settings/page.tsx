'use client';
import {useCurrentUser} from "@/hooks/use-current-user";
import {logout} from "@/actions/logout";

const SettingsPage = () => {
    const session = useCurrentUser()

    const onClick = () => {
        logout()
    }
    return (
        <div className='bg-white p-10 rounded-xl'>
      
            <button type="submit" onClick={onClick}>SignOut</button>
        </div>
    );
};

export default SettingsPage