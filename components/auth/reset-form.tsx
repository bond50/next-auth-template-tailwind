"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {z} from "zod";
import {resetSchema} from "@/schemas";
import CardWrapper from "@/components/auth/card-wrapper";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {reset} from "@/actions/reset";
import {useState, useTransition} from "react";


export function ResetForm() {

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            email: "",
        },

    })

    function onSubmit(values: z.infer<typeof resetSchema>) {
        setSuccess('')
        setError('')
        startTransition(() => {
            console.log('Submitting login form with values:', values);
            reset(values).then((data) => {

                if (data?.error) {
                    setError(data.error)
                }
                setSuccess(data.success)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel={"Forgot Password?"}
            backButtonLabel={"Back to login"}
            backButtonHref={"/auth/login"}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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


                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button type="submit" className='w-full' disabled={isPending}>Send reset email</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}