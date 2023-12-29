import React from 'react'

import PrivateRoutes from './pages/privateRoutes';
import PublicRoutes from './pages/publicRoutes';
import { useSelector } from 'react-redux';

const RouterComp = () => {

    const state = useSelector((state) => state);
    const isLogin = state.reducer_public.isLogin;
    const check = JSON.parse(localStorage.getItem('isLogin'));
    return (
        <>
            {
                check ? <PrivateRoutes /> : <PublicRoutes />
            }
        </>
    )
}

export default RouterComp