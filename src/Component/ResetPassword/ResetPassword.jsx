import React, { useState } from 'react'
import '../Login/login.css'
import { Typography, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { forgetPassword, resetPassword } from '../../Redux/AccountReducer/action';


const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [sendStatus, setSendStatus] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useParams();
    

  

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log("calling forget password function")
        await dispatch(resetPassword(token, password))
        setSendStatus("password Reset Successfully")
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

                <Typography variant='h6'>Reset Password</Typography>
                <input 
                    type="password" 
                    placeholder='password' 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />


                <Button type='submit' disabled={!password}>
                    Update Password
                </Button>

                <Typography variant='h6' style={{ padding: "2vmax" }}>
                    {sendStatus}
                </Typography>
            </form>
            
        </div>
    )
}

export default ResetPassword
