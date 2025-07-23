'use client'


import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {RoleGate} from "@/components/auth/role-gate";
import {UserRole} from "@prisma/client";

const AdminPage = () => {
    return (
        <Card className="p-4 w-[600px]">
            <CardHeader>
                <p className='text-2xl font-semibold text-center'>
                    Admin Component
                </p>
            </CardHeader>
            <CardContent className='space-y-6'>
                <RoleGate allowedRoles={UserRole.ADMIN}>
                    <div className='flex flex-col items-center justify-center space-y-4'>
                        <p className='text-lg text-gray-700'>Welcome to the Admin Page!</p>
                        <p className='text-sm text-gray-500'>Only users with the admin role can see this content.</p>
                    </div>

                </RoleGate>
            </CardContent>

        </Card>
    );
};

export default AdminPage;