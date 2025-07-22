'use client'
import Link from 'next/link';
import {usePathname} from "next/navigation";
import {UserButton} from "@/components/auth/user-button";

export const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav className='bg-secondary flex items-center justify-between p-4 rounded-xl w-[600px] shadow-sm'>
            <div className=' text-lg font-semibold'>
                MyApp
            </div>
            <ul className='flex space-x-4'>
                <li>
                    <Link href="/server" className='hover:underline'>Server</Link>
                </li>
                <li>
                    <Link href="/client" className='hover:underline'>Client</Link>
                </li>
                <li>
                    <Link href="/admin" className='hover:underline'>Admin</Link>
                </li>
                <li>
                    <Link href="/settings" className='hover:underline'>Settings</Link>
                </li>
            </ul>

            <UserButton/>
        </nav>
    );
};

