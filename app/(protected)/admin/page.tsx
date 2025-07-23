'use client'


import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {RoleGate} from "@/components/auth/role-gate";
import {UserRole} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {adminAction} from "@/actions/admin";

const AdminPage = () => {
    const onAPiRouteClick = () => {
        fetch('/api/admin').then(res => {
            if (res.ok) {
                toast.success('API route accessed successfully');
            } else {
                toast.error('Forbidden: You do not have permission to access this API route');

            }
        })
    }

    const onServerActionClick = async () => {
        const data = await adminAction()
        if (data.error) {
            toast.error(data.error);
        } else {
            toast.success(data.success);
        }
    }

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

                <div className='flex flex-row items-center justify-between rounded-lg border shadow-md'>
                    <p className='text-sm text-gray-500 p-3'>
                        Admin only api route
                    </p>

                    <Button onClick={onAPiRouteClick}>
                        Click to test
                    </Button>

                </div>
                <div className='flex flex-row items-center justify-between rounded-lg border shadow-md'>
                    <p className='text-sm text-gray-500 p-3'>
                        Admin only server action
                    </p>

                    <Button onClick={onServerActionClick}>
                        Click to test
                    </Button>

                </div>
            </CardContent>

        </Card>
    );
};

export default AdminPage;