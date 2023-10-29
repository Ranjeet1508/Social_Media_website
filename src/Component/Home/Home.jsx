import React, { useEffect } from 'react'
import './home.css'
import User from '../User/User'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost } from '../../Redux/PostReducer/action'
import { Button, Typography} from '@mui/material'
import { getAllUsers } from '../../Redux/UserReducer/action'
import { Link } from 'react-router-dom'



const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());
    //dispatch(getAllUsers());
  }, [dispatch])

  const posts = useSelector((state) => state.postReducer.postOfUsers)
  const allUsers = useSelector((state) => state.authReducer.isUser?.following)

  return (
    <div className='home'>
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts.map((post, idx) =>
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
              isAccount={false}
              isDelete={false}
            />)
        ) : (
          <Typography variant='h6'>No posts yet</Typography>
        )}
      </div>


      <div className="homeright">
        <Typography variant='h6'>{ allUsers == 0 ? "" : "My Friends"}</Typography>
        {allUsers && allUsers.length > 0 ? (
          allUsers.map((user, idx) =>
            <User
              key={idx}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url} />
          )
        ) : (
          <div>
            <Typography variant='h6'>You have no friends Yet</Typography>

            <Link to='/find-friends'><Button>Find Friends</Button></Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default Home
