'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";
import {useCurrentUser} from "@/hooks/use-current-user";

import {BiExit} from "react-icons/bi";
import {LogoutButton} from "@/components/auth/logout-button";

export const UserButton = () => {
    const user = useCurrentUser()


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} alt=""/>
                    <AvatarFallback className='bg-sky-500'>
                        <FaUser className='text-white'/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40' align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <LogoutButton>
                    <DropdownMenuItem>
                        <BiExit className='h-7 w-7 mr-2'/>
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

