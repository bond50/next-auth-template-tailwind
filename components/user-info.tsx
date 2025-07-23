import React from 'react';
import {ExtendedUser} from "@/types/next-auth";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
}

export const UserInfo = ({
                             user, label
                         }: UserInfoProps) => {
    return (
        <Card className='w-[600px] shadow-md'>
            <CardHeader>
                <p className='text-2xl font-semibold text-center'>
                    {label}
                </p>

                <CardContent className='space-y-4'>
                    <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <p className='text-sm text-gray-500'>ID</p>
                        <p className='text-sm text-gray-500'>{user?.id}</p>

                    </div>
                    <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <p className='text-sm text-gray-500'>Name</p>
                        <p className='text-sm text-gray-500'>{user?.name}</p>

                    </div>
                    <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <p className='text-sm text-gray-500'>Email</p>
                        <p className='text-sm text-gray-500'>{user?.email}</p>

                    </div>
                    <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <p className='text-sm text-gray-500'>Role</p>
                        <p className='text-sm text-gray-500'>{user?.role}</p>

                    </div>
                    <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <p className='text-sm text-gray-500'>Two factor authentication</p>
                        <Badge variant={user?.isTwoFAEnabled ? "success" : "destructive"}
                               className='text-sm text-gray-500'>{user?.isTwoFAEnabled ? "ON" : "OFF"}
                        </Badge>

                    </div>

                </CardContent>
            </CardHeader>

        </Card>
    );
};

