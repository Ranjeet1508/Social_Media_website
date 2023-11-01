import './editProfile.css'
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../Redux/UserReducer/action';
import { loadUser } from '../../Redux/AuthReducer/action';


const EditProfile = () => {
    const { isUser } = useSelector((state => state.authReducer))
    const { updateUserLoading, updateUserError, updateUserSuccess } = useSelector((state => state.userReducer))
    
    const [name, setName] = useState(isUser?.name);
    const [email, setEmail] = useState(isUser?.email);
    const [avatar, setAvatar] = useState(null);
    const [updateMsg, setUpdateMsg] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(isUser?.avatar?.url);


    const navigate = useNavigate();
    const dispatch = useDispatch();

 
    const hanldeImage = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatarPreview(Reader.result)

                setAvatar(Reader.result)
            }
        }
    }

    const updateProfileHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateUserProfile(name, email, avatar));
        await dispatch(loadUser());      
    }


     useEffect(() => {
        if(updateUserError){
            setUpdateMsg("Can't update the Profile")
        }
        else if(updateUserSuccess===true){
            setUpdateMsg("Updated Successfully");
            setTimeout(() => {
                navigate('/account')
            }, 3000)
        }
        
    }, [updateUserError, updateUserSuccess, dispatch])




    return (
        <div className='editProfile'>


            <form className="editProfileForm" onSubmit={updateProfileHandler}>
                <Typography variant='h4' style={{ padding: "2vmax" }}>
                    100 gram
                </Typography>

                <Avatar src={avatarPreview} alt='user' />

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
                    className='editProfileInputs'
                />

                <input
                    type="email"
                    placeholder='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='editProfileInputs'
                />


                <Button type='submit' onSubmit={updateProfileHandler} disabled={updateUserLoading}>
                    Update
                </Button>

                <Typography variant='h6'>{updateMsg}</Typography>
            </form>
        </div>
    )
}




export default EditProfile
