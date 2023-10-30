import React, { useEffect } from 'react'
import './findFriends.css'
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import User from '../User/User'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../../Redux/UserReducer/action'

const FindFriends = () => {
    
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.userReducer.allUsers)

    useEffect(() => {
        dispatch(getAllUsers())
    },[])

    return (
        <div className='findFriends'>
            <div className='searchBar'>
                <input type="text" placeholder='Search...' />
            </div>
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

export default FindFriends
