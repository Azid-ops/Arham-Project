import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { sendUserData, showPassword } from './LogInFunc';
import validator from 'validator';
import { validateEmail } from './SignUpFunc';

export default function LogIn() {
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
            <form className='border-2 border-black flex flex-col text-center'>
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
                        className='border-0 outline-none pl-1 border-black self-center flex-grow rounded-full focus:text-black active:shadow-2xl' />
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
                <span className='self-center text-left w-11/12 sm:w-96 border-none'>
                    <input type='checkBox' className='checkBox' id='showPass' onClick={(e) => { showPassword(e, setPass) }}></input><label htmlFor='showPass'> Show Password</label>
                </span>
                <input type='submit' onClick={(e) => {
                    e.preventDefault();
                    console.log("submitted");
                    sendUserData(userPassword, userEmail, setPassword, setEmail, navigate);
                }} className='border-2 border-black w-11/12 sm:w-96 self-center rounded-full'
                ></input>
                <Link to={"/signup"} className='hover:text-blue-700 hover:underline'>Don't have an account? Signup</Link>
            </form>
        </>
    )
}
