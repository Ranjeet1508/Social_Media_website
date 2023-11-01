import React from 'react'
import './comment.css'
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, getAllPost, } from '../../Redux/PostReducer/action';
import { getMyPost } from '../../Redux/AccountReducer/action';

const Comment = ({ userId, avatar, name, comment, commentId, postId, isAccount }) => {

    const dispatch = useDispatch();
    const loggedInUserId = useSelector((state => state.authReducer.isUser?._id))

    const deleteCommenthandler = async() => {
        console.log(commentId)
        await dispatch(deleteComment(postId, commentId));
        if (isAccount) {
            dispatch(getMyPost())
        }
        else {           
            dispatch(getAllPost());
        }
    }
    return (
        <div className='userComment'>
            <div>
                <Link to={`/user/${userId}`} className='commenter'>
                    <img src={avatar} alt={name} />
                </Link>
            </div>
            
            <div className='name'>
                <Typography>@{name} </Typography>
                <Typography>{comment} </Typography>  
            </div>

            

            <Button style={{ color: "red", marginLeft:'20px'}} onClick={deleteCommenthandler}>{(userId===loggedInUserId || isAccount) ? <Delete /> : ""}</Button>

        </div>
    )
}

export default Comment
