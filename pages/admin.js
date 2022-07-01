
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';

export default function Admin() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    useEffect(() => {
        if(!user) {
            router.push("/signup");
        }
    }, [])
    
    return (
        <div>
            <h1> hi this is admin </h1>
        </div>

    )
}


