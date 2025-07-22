"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {z} from "zod";
import {loginSchema} from "@/schemas";
import CardWrapper from "@/components/auth/card-wrapper";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {login} from "@/actions/login";
import {useState, useTransition} from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";

export function LoginForm() {
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();

    const urlError = searchParams.get("error") === 'OAuthAccountNotLinked' ? "Email already in use with different provider" : ''


    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            code: ""
        },

    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        setSuccess('')
        setError('')
        startTransition(() => {
            console.log('Submitting login form with values:', values);
            login(values).then((data) => {
                if (data?.error) {
                    form.reset();
                    setError(data.error)
                }
                if (data?.success) {
                    setSuccess(data.success)
                    form.reset();
                }
                if (data?.twoFactorRequired) {
                    setShowTwoFactor(true);
                }

            }).catch((err) => {
                console.error('Error during login:', err);
                setError('An unexpected error occurred. Please try again later.');
            })
        })
    }

    return (
        <CardWrapper
            headerLabel={"Welcome back"}
            backButtonLabel={"Don't have an account?"}
            backButtonHref={"/auth/register"}
            showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {
                        showTwoFactor && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Two Factor Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="123456"
                                                type="text"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        )
                    }
                    {
                        !showTwoFactor && (
                            <>
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
                                            <Button size='sm' variant='link'
                                                    className='px-0  text-sm text-muted-foreground hover:underline font-normal'
                                                    asChild>
                                                <Link href='/auth/reset'>
                                                    Forgot password?
                                                </Link>
                                            </Button>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )
                    }
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button type="submit" className='w-full' disabled={isPending}>{
                        showTwoFactor ? "Submit Code" : "Login"
                    }</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}