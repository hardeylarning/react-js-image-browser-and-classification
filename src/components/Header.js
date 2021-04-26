import React, { useState, useContext } from 'react'
import { Link, useHistory, NavLink } from 'react-router-dom'
import firebase from "../config/firebase"
import Context from '../context/AppContext';

export default function Header() {
   // const [isLoggedIn, setIsLoggedIn] = useState(false)
    const history = useHistory();
    const [isLoggedIn, user] = useContext(Context)

   

    function logout() {
        firebase.auth().signOut().then(res =>{
           // setIsLoggedIn(false)
            history.replace("/login")
        }).catch(e => {
            console.log(e.response.data);
        })
    }
    return (
        <nav className="py-5 bg-gray-900 text-white flex justify-between">
            <ul className="flex justify-between px-10">
                    <li className="mr-6">
                        <NavLink to="/" exact={true} activeClassName="underline text-blue-200">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/gallery" activeClassName="underline text-blue-200">Gallery</NavLink>
                    </li>
                    <li className='ml-6'>
                        <NavLink to="/tensor" activeClassName="underline text-blue-200">TensorFlow</NavLink>
                    </li>
            </ul>
            <ul className="flex justify-between px-10">
                <li className="mr-6">
                    {
                        isLoggedIn ? <button onClick={logout}>Logout</button>
                        : <NavLink to="/login" activeClassName="underline text-blue-200">Login</NavLink>
                    }
                    
                </li>
                {
                    !isLoggedIn && <li><NavLink to="/signup" activeClassName="underline text-blue-200">Sign Up</NavLink></li> 
                }
            </ul>
        </nav>
    )
}
