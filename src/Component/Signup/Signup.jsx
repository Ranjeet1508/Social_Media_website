import React, { useEffect, useState } from 'react';
import './signup.css'
import { Avatar, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../Redux/AuthReducer/action';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [avatar, setAvatar] = useState(null);
    const [signupMsg, setSignupMsg] = useState("");
    const {signupLoading, signupError, signupSuccess} = useSelector((state => state.authReducer))

    const navigate = useNavigate();
    const dispatch = useDispatch();

 
    const hanldeImage = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result)
            }
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        await dispatch(signupUser(name, email, password, avatar))
    }



    useEffect(() => {
        if(signupError){
            setSignupMsg("User already exist")
        }
        else if(signupSuccess===true){
            setSignupMsg("Signup Successfull");
            setTimeout(() => {
                navigate('/')
            },2000)
        }
    }, [signupError, signupSuccess, dispatch])





    return (
        <div className='signup'>


            <form className="signupForm" onSubmit={handleSignup}>
                <Typography variant='h4' style={{ padding: "2vmax" }}>
                    100 gram
                </Typography>

                <Avatar src={avatar} alt='user' />

                <Typography variant='h6' style={{ fontWeight: '300' }} >Profile Picture </Typography>
                <input type="file"
                    accept='image/*'
                    onChange={hanldeImage}
                    required
                />

                <input type="text"
                    placeholder='Name'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='signupInputs'
                />

                <input
                    type="email"
                    placeholder='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='signupInputs'
                />


                <input
                    type="password"
                    placeholder='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='signupInputs'

                />


                <Link to='/forgot/password'>
                    <Typography>Forgot Password?</Typography>
                </Link>

                <Button type='submit' disabled={(!email && !password) || signupLoading}>
                    Signup
                </Button>

                <Typography variant='h6'>{signupMsg}</Typography>
            </form>
        </div>
    )
}

export default Signup
