import React, { useEffect, useState } from 'react'
import '../Account/account.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPost } from '../../Redux/AccountReducer/action'
import { CircularProgress, Alert, AlertTitle, Typography, Avatar, Button, Dialog } from '@mui/material'
import Post from '../Post/Post'
import User from '../User/User'
import { Link, useNavigate } from 'react-router-dom'







const UserProfile = () => {

    const isLoading = useSelector((state => state.myPostReducer.isLoading))
    const isError = useSelector((state => state.myPostReducer.isError))
    const myPosts = useSelector((state => state.myPostReducer.myPosts))
    const user = useSelector((state => state.authReducer.isUser))
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [followBox, setFollowBox] = useState(false);
    const [followingBox, setFollowingBox] = useState(false);


    useEffect(() => {
        dispatch(getMyPost())
    }, [])



    return isLoading ? (
        <div className="alert">
            <CircularProgress style={{ width: 60, height: 60 }} />
        </div>
    ) : isError ? (
        <div className="alert">
            <Alert style={{ fontSize: '1.5rem', padding: '16px' }} severity="error">
                <AlertTitle>404 Not Found</AlertTitle>
                Something went wrong. Please try again later.
            </Alert>
        </div>
    ) : (
        <div className='account'>

            <div className="accountLeft">
                {myPosts && myPosts.length > 0 ? (
                    myPosts.map((post, idx) =>
                        <Post
                            key={idx}
                            postImage={post.image.url}
                            caption={post.caption}
                            postId={post._id}
                            likes={post.likes}
                            commentsOnPost={post.comments}
                            ownerImage={post.owner.avatar.url}
                            ownerName={post.owner.name}
                            ownerId={post.owner._id}
                            isAccount={true}
                            isDelete={true}
                        />
                    ))
                    : (
                        <Typography variant='h3'>No Posts Yet</Typography>
                    )
                }
            </div>

            <div className="accountRight">
                <div>
                    <Avatar
                        src={user?.avatar?.url}
                        sx={{ height: "8vmax", width: "8vmax" }}
                    />

                    <Typography variant='h5'>{user?.name}</Typography>
                </div>


                <div>
                    <button onClick={() => setFollowBox(true)}>
                        <Typography>followers</Typography>
                    </button>
                    <Typography>{user?.follower?.length}</Typography>
                </div>

                <div>
                    <button onClick={() => setFollowingBox(true)}>
                        <Typography>following</Typography>
                    </button>
                    <Typography>{user?.following?.length}</Typography>
                </div>

                <div>

                    <Typography>Posts</Typography>
                    <Typography>{user?.posts?.length}</Typography>

                    <div className="followbtn">
                        <Button>Follow</Button>
                    </div>
                </div>
            </div>

            <Dialog open={followBox} onClose={() => setFollowBox(!followBox)}>
                <div className="DialogBox">
                    <Typography variant='h4'>Followers</Typography>
                    {user && user.follower.length > 0 ? (
                        user.follower.map((user, idx) =>
                            <User
                                key={idx}
                                userId={user._id}
                                name={user.name}
                                avatar={user?.avatar?.url} />
                        )
                    ) : (
                        <Typography style={{ margin: "2vmax" }}>No follwers yet</Typography>
                    )
                    }
                </div>
            </Dialog>

            <Dialog open={followingBox} onClose={() => setFollowingBox(!followingBox)}>
                <div className="DialogBox">
                    <Typography variant='h4'>Following</Typography>
                    {user && user.following.length > 0 ? (
                        user.following.map((user, idx) =>
                            <User
                                key={idx}
                                userId={user._id}
                                name={user.name}
                                avatar={user?.avatar?.url} />
                        )
                    ) : (
                        <Typography style={{ margin: "2vmax" }}>`${user.name} is not following anyone`</Typography>
                    )
                    }
                </div>
            </Dialog>
        </div>
    )
}

export default UserProfile
