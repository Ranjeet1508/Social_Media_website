import React, { useState } from 'react'
import '../Login/login.css'
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { forgetPassword } from '../../Redux/AccountReducer/action';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [sendStatus, setSendStatus] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

  

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log("calling forget password function")
        await dispatch(forgetPassword(email))
        setSendStatus("Sent to your Email")
        setTimeout(() => {
            navigate('/')
        },2000)              
    }

   
    
    return (
        <div className='login'>
            <form className='loginForm' onSubmit={submitHandler}>
                <Typography variant='h4' style={{ padding: "2vmax" }}>
                    100 gram
                </Typography>

                <input 
                    type="email" 
                    placeholder='email' 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />


                <Button type='submit' disabled={!email}>
                    Send
                </Button>

                <Typography variant='h6' style={{ padding: "2vmax" }}>
                    {sendStatus}
                </Typography>
            </form>
            
        </div>
    )
}

export default ForgetPassword
