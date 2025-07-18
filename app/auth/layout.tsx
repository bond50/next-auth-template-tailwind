import {ReactNode} from "react";

const AuthLayout = ({children}: { children: ReactNode }) => {
    return (
        <div className='h-full flex items-center justify-center bg-gradient-to-tr from-sky-400 to-blue-800'>
            {children}
        </div>
    );
};

export default AuthLayout;