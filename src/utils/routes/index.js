import Home from "../../page/Home";
import React from 'react'
import Gallery from "../../page/Gallery";
import Login from "../../page/Login";
import SignUp from "../../page/SignUp";
import TensorFlow from "../../page/tensorflow";

export default [
    {
        path: "/",
        exact: true,
        component: () => <Home />,
        protected: null
    },
    {
        path: "/gallery",
        component: () => <Gallery />,
        protected: 'auth'
    },
    {
        path: "/login",
        component: () => <Login />,
        protected: 'guest'
    },
    {
        path: "/signup",
        component: () => <SignUp />,
        protected: 'guest'
    },
    {
        path: "/tensor",
        component: () => <TensorFlow />,
        protected: null
    }
]