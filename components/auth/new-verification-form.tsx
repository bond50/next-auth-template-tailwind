'use client'
import CardWrapper from "@/components/auth/card-wrapper";
import {BeatLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {newVerification} from "@/actions/new-verification";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';

    const onSubmit = useCallback(() => {

        if (!token) {
            setError('Token is required');
            return;
        }
        newVerification(token).then((result) => {
            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(result.success);
            }
        }).catch((err) => {
            console.error('Error during verification:', err);
            setError('An unexpected error occurred. Please try again later.');
        })

    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper
            headerLabel='Confirming your verification'
            backButtonLabel='Back to login'
            backButtonHref='/auth/login'>
            <div className='flex items-center justify-center w-full'>
                {!success && !error && (
                    <BeatLoader/>
                )}
                {success && <FormSuccess message={success}/>}
                {error && <FormError message={error}/>}
            </div>
        </CardWrapper>
    );
};
