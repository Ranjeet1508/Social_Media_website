import React, { useEffect } from 'react'
import '../FindFriends/findFriends.css'
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import User from '../User/User'
import { Link } from 'react-router-dom'
import { loadUser } from '../../Redux/AuthReducer/action'

const MyFriends = () => {
    
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.authReducer.isUser?.following)

    useEffect(() => {
        dispatch(loadUser())
    },[])

    return (
        <div className='findFriends'>
            <Typography variant='h4'>My Friends</Typography>
            <div className="allUsers">
                {allUsers && allUsers.length > 0 ? (
                    allUsers.map((user, idx) => {
                        return <div className='userBox' key={idx}>
                            <User
                              key={idx}
                              userId={user._id}
                              name={user.name}
                              avatar={user.avatar.url}
                            />
  
                            <Link to={`user/${user._id}`}>
                                <Button>
                                    View Full Profile
                                </Button>
                            </Link>
                        </div> 
                    }
                       
                    )
                ) : (
                    <Typography variant='h6'>No user found</Typography>
                )}

            </div>
        </div>
    )
}

export default MyFriends
