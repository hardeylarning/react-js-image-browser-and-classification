
import React, { useContext } from 'react'
import Context from '../../context/AppContext'
import { Route, Redirect } from 'react-router-dom';
import Loading from '../../components/Loading';
import { motion } from 'framer-motion';
import AnimatedRoute from './AnimatedRoute';

export default function GuestRoute({children, ...rest}) {
    const [isLoggedIn] = useContext(Context);

    if (isLoggedIn === null) return <Loading />

    if (!isLoggedIn) return (
        <AnimatedRoute {...rest} >
            {children}
        </AnimatedRoute>)

    return <Redirect to='/' />
}