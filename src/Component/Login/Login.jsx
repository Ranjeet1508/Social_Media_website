import React, { useEffect, useState } from 'react'
import './login.css'
import { Typography, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { handleLogin } from '../../Redux/AuthReducer/action';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const [loginMsg, setLoginMsg] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let isAuth = useSelector((state) => state.authReducer.isAuth)
    let isLoading = useSelector((state) => state.authReducer.isLoading)
    let isError = useSelector((state) => state.authReducer.isError)

    const loginHandler = async(e) => {
        e.preventDefault();
        setLoginMsg("Logging in...")
        await dispatch(handleLogin(email,password))   
        if(isError){
            setLogin("Wrong Credentials \n Or \n User doesn't exist")
            setTimeout(() => {
                setPassword("");
                setLogin("");
                setLoginMsg("");
            },2000)
        }              
    }

    useEffect(() => {
        if (isAuth !== null) {   
          if (isAuth) {
            setLogin('Login Successful');
            setTimeout(() => {
              navigate('/home');
            }, 2000);
          }
        }
      }, [isAuth, isError]);
    
    return (
        <div className='login'>
            <form className='loginForm' onSubmit={loginHandler}>
                <Typography variant='h5' style={{ padding: "2vmax" }}>
                    Login
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

                <Typography variant='h6' >{loginMsg}</Typography>
                <Typography variant='h6' style={login==='Login Successful' ? {color:'green'} : {color:'red'}}>{login}</Typography>

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
            </form>
            
        </div>
    )
}

export default Login
