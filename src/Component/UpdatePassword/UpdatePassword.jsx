import React, { useEffect, useState } from 'react'
import './updatePassword.css'
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { updatePassword } from '../../Redux/UserReducer/action';
import { loadUser } from '../../Redux/AuthReducer/action';


const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [updatedMsg, setUpdatedMsg] = useState("");

    const {updatePasswordLoading, updatePasswordError, updatePasswordSuccess} = useSelector((state => state.userReducer));
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const updatePasswordHandler = async(e) => {
        e.preventDefault();
        await dispatch(updatePassword(oldPassword, newPassword));
        dispatch(loadUser());               
    }

    useEffect(() => {
        if(updatePasswordError){
            setUpdatedMsg("Wrong Credentials")
        }
        else if(updatePasswordSuccess===true){
            setUpdatedMsg("Password Updated Successfully");
            setTimeout(() => {
                navigate('/account')
            }, 2000)
        }
    }, [updatePasswordError, updatePasswordSuccess, dispatch])

    
    
    return (
        <div className='updatePassword'>
            <form className='updatePasswordForm' onSubmit={updatePasswordHandler}>
                <Typography variant='h4' style={{ padding: "2vmax" }}>
                    100 gram
                </Typography>

                <input 
                    type="password"
                    placeholder='old password' 
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />


                <input 
                    type="password"
                    placeholder='new password' 
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                

                <Button type='submit' disabled={(!oldPassword && !newPassword) || updatePasswordLoading}>
                    Change Password
                </Button>

                <Typography variant='h6'>{updatedMsg}</Typography>
            </form>
            
        </div>
    )
}



export default UpdatePassword
