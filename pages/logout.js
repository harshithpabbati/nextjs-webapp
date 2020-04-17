import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';

const cookies = new Cookies();

const LogoutPage = () => {
    const router = useRouter();
    const [loggedOut, setLoggedOut] = useState(false);
    useEffect(() => {
        cookies.remove('token');
        cookies.remove('refreshToken');
        cookies.remove('username');
        cookies.remove('transactionID');
        localStorage.clear();
        if(!loggedOut) {
            router.push('/login');
            setLoggedOut(true);
        }
    });

    return null
};

export default LogoutPage;