"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {z} from "zod";
import {newPasswordSchema} from "@/schemas";
import CardWrapper from "@/components/auth/card-wrapper";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {useState, useTransition} from "react";
import {useSearchParams} from "next/navigation";
import {newPassword} from "@/actions/newPassword";


export function NewResetForm() {
    const searchParams = useSearchParams();

    const token = searchParams.get("token");


    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: "",
        },

    })

    function onSubmit(values: z.infer<typeof newPasswordSchema>) {
        setSuccess('')
        setError('')
        startTransition(() => {
            newPassword(values, token).then((data) => {
                if (data?.error) {
                    setError(data.error)
                }
                setSuccess(data.success)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel={"Enter your new password"}
            backButtonLabel={"Back to login"}
            backButtonHref={"/auth/login"}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        placeholder="********"
                                        type="password"
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button type="submit" className='w-full' disabled={isPending}>Reset password</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}