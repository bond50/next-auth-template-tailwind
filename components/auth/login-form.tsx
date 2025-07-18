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

export function LoginForm() {

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },

    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            console.log(values);
        } catch (error) {
            console.error("Form submission error", error);

        }
    }

    return (
        <CardWrapper
            headerLabel={"Welcome back"}
            backButtonLabel={"Don't have an account?"}
            backButtonHref={"/auth/register"}
            showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
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
                                        placeholder="********"
                                        type="password"
                                        {...field} />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormError message={''}/>
                    <FormSuccess message='Success'/>
                    <Button type="submit" className='w-full'>Login</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}