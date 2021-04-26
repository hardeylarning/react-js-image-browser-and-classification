
import React, { useState } from 'react'
import firebase from '../config/firebase';
import { useHistory } from 'react-router-dom';

export default function Login() {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({email: "", password: ""})
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    const history = useHistory()

    function handleForm(e) {

        if (isLoading) return;
        setIsLoading(true)
        e.preventDefault()
        console.log("Submitted");
        firebase.auth().signInWithEmailAndPassword(form.email, form.password).then((res) => {
           // setIsLoggedIn(true)
            history.replace("/")
            setError("")
            setIsLoading(false)

        }).catch((e) => {
            setError(e.message);
            setIsLoading(false)
        });
    }

    function handleInput(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    // if (isLoggedIn) return <Redirect to ="/" />

    return (
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg 
            rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-600">
                <form className="m-5 w-10/12" onSubmit={handleForm}>
                    {
                        error !== "" && <p>{error}</p>
                    }
                    <h1 className="w-full text-4xl tracking-widest text-center my-6">Login Screen</h1> 
                    <div className="w-full my-6">
                        <input type="email" className="p-2 rounded text-black shadow w-full"
                        placeholder="Email or Username" value={form.email} 
                        onChange={handleInput} name="email"/>
                    </div>
                    <div className="w-full my-6">
                        <input type="password" className="p-2 rounded text-black shadow w-full"
                        placeholder="Password" value={form.password} 
                        onChange={handleInput} name="password"/>
                    </div>
                    <div className="w-full my-10">
                        <button type="submit" className="p-2 rounded shadow w-full 
                        bg-gradient-to-tr from-yellow-700 to-yellow-500  text-black">
                            {
                                isLoading ?<p className="m-auto">Loading...</p>
                                : "Login"
                            } 
                            </button>
                    </div>
                </form>
            </div>
        </div>
    )
}