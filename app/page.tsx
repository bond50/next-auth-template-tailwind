import {Poppins} from "next/font/google";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {LoginButton} from "@/components/auth/login-button";


const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})
export default function Home() {
    return (
        <main className="flex h-full flex-col items-center
        justify-center p-24
       bg-gradient-to-tr from-sky-400 to-blue-800">
            <div className="space-y-6 text-center">
                <h1 className={cn('text-6xl font-semibold text-white drop-shadow-md', font.className)}>Auth</h1>
                <p className='text-white text-lg'>Simple Authentication setup</p>
                <LoginButton>
                    <Button variant='secondary' size='lg'>Sign in</Button>
                </LoginButton>
            </div>
        </main>

    )
        ;
}
