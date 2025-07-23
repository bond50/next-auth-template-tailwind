'use client';


import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {settings} from "@/actions/settings";
import {useTransition} from "react";
import {useSession} from "next-auth/react";

const SettingsPage = () => {
    const [isPending, startTransition] = useTransition();

    const {update} = useSession();

    async function onClick() {
        startTransition(async () => {
            const data = await settings({name: 'Kufu'})
            if (data.error) {
                console.error(data.error);
            } else {
                console.log(data.success);
                await update()
            }
        });


    }

    return (
        <Card className='w-[600px] p-4'>
            <CardHeader>
                <p className='text-center text-2xl font-bold'>Settings
                    Settings Page
                </p>
            </CardHeader>
            <CardContent>
                <Button onClick={onClick} disabled={isPending}>
                    Update name
                </Button>
            </CardContent>
        </Card>
    );
};

export default SettingsPage