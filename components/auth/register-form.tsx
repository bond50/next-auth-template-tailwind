"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {z} from "zod";
import {registerSchema} from "@/schemas";
import CardWrapper from "@/components/auth/card-wrapper";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {register} from "@/actions/register";
import {useState, useTransition} from "react";

export function RegisterForm() {

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
        },

    })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        setSuccess('')
        setError('')
        startTransition(() => {
            register(values).then((data) => {
                if (data.error) {
                    setError(data.error)
                }
                setSuccess(data.success)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel={"Create an account"}
            backButtonLabel={"Already have an account?"}
            backButtonHref={"/auth/login"}
            showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Your name</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending}
                                           placeholder="Your name"
                                           type="text"
                                           {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending}
                                           placeholder="doe@example.com"
                                           type="email"
                                           {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

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
                    <Button type="submit" className='w-full' disabled={isPending}>Create an account</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}