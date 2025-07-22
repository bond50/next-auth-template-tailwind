import React from 'react';
import {auth} from "@/auth";
import {currentUser} from "@/lib/auth";

const ServerPage = async () => {
   const user = await currentUser()
    return (
        <div>
            {JSON.stringify(user, null, 2)}
            Server page
        </div>
    );
};

export default ServerPage;