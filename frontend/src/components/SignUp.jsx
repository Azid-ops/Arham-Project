import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { validateEmail } from './SignUpFunc';
import { showPassword } from './LogInFunc';
import { sendUserData } from './SignUpFunc';

export default function SignUp() {
    const [confirmPass, setConPass] = useState("");
    const [userPassword, setPassword] = useState("");
    const [userEmail, setEmail] = useState("");
    const [showPass, setPass] = useState("password");
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token"))
            navigate("/home");
    }, [])

    return (
        <>
            <form onSubmit={() => { preventDefault() }} className='border-2 border-black flex flex-col text-center'>
                <label htmlFor="userEmail">Email</label>
                <div className='bg-white w-11/12 sm:w-96 border-2 rounded-full self-center flex border-black focus-within:border-blue-600 focus-within:text-blue-600'>
                    <FontAwesomeIcon icon={faUser} className=' border-1 mt-1 ml-1 bg-none focus-input:text-blue-600'></FontAwesomeIcon>
                    <input
                        required
                        type="text"
                        id="userEmail"
                        value={userEmail}
                        name="userEmail"
                        onChange={(a) => { setEmail(a.target.value); validateEmail(a, validator, setMessage) }}
                        className='border-0 outline-none pl-1 border-black self-center flex-grow rounded-full focus:text-black' />
                </div>
                <span>{message}</span>
                <label htmlFor='userPassword'>Password</label>
                <div className='bg-white w-11/12 sm:w-96 border-2 rounded-full self-center flex border-black focus-within:border-blue-600 focus-within:text-blue-600'>
                    <FontAwesomeIcon icon={faLock} className=' border-1 mt-1 ml-1 bg-none focus-input:text-blue-600'></FontAwesomeIcon>
                    <input
                        type={showPass}
                        id="userPassword"
                        name="userPassword"
                        value={userPassword}
                        onChange={(a) => { setPassword(a.target.value) }}
                        className='border-0 outline-none pl-1 border-black self-center flex-grow rounded-full focus:text-black' />
                </div>
                <label htmlFor='confirmPass'>ReType-Password</label>
                <div className='bg-white w-11/12 sm:w-96 border-2 rounded-full self-center flex border-black focus-within:border-blue-600 focus-within:text-blue-600'>
                    <FontAwesomeIcon icon={faLock} className=' border-1 mt-1 ml-1 bg-none focus-input:text-blue-600'></FontAwesomeIcon>
                    <input
                        type={showPass}
                        id="confirmPass"
                        name="confirmPass"
                        value={confirmPass}
                        onChange={(a) => { setConPass(a.target.value) }}
                        className='border-0 outline-none pl-1 border-black self-center flex-grow rounded-full focus:text-black' />
                </div>
                <span className='self-center text-left w-11/12 sm:w-96 border-none'>
                    <input type='checkBox' className='checkBox' id='showPass' onClick={(e) => { showPassword(e, setPass) }}></input><label htmlFor='showPass'>Show Password</label>
                </span>
                <input type='submit' onClick={(e) => {
                    e.preventDefault();
                    if (userEmail && userPassword && confirmPass) {
                        if (message === "") {
                            console.log("submitted");
                            sendUserData(userPassword, confirmPass, userEmail, setPassword, setEmail, setConPass, navigate);
                        } else
                            alert("Enter a valid Email")
                    }
                    else
                        alert("Input Fields can't be Empty");
                }} className='border-2 border-black w-11/12 sm:w-96 self-center rounded-full'

                ></input>
                <Link to={"/"} className='hover:text-blue-700 hover:underline'>Already have an account? Login</Link>
            </form>
        </>
    )
}
