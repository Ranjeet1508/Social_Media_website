import React, { useEffect, useState } from 'react'
import './login.css'
import { Typography, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { handleLogin } from '../../Redux/AuthReducer/action';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let isAuth = useSelector((state) => state.authReducer.isAuth)

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(handleLogin(email,password))                 
    }

    useEffect(() => {
        if (isAuth !== null) {
          if (isAuth) {
            setLogin('Login Successful');
            setTimeout(() => {
              navigate('/home');
            }, 2000);
          }
          else {
            setLogin("Wrong Credentials \n Or \n User doesn't exist")
            setPassword("");
          }
        }
      }, [isAuth, navigate]);
    
    return (
        <div className='login'>
            <form className='loginForm' onSubmit={loginHandler}>
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


                <input 
                    type="password"
                    placeholder='password' 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                

                <Link to='/forgot/password'>
                    <Typography>Forgot Password?</Typography>
                </Link>

                <Button type='submit' disabled={!email && !password}>
                    Login
                </Button>

                <Link to='/signup'>
                    <Typography>don't have an account? Sign up</Typography>
                </Link>
{/* <br /> */}
                <Typography variant='h6' style={login==='Login Successful' ? {color:'green'} : {color:'red'}}>{login}</Typography>
            </form>
            
        </div>
    )
}

export default Login
