import React from 'react'
import {Link} from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deleteComment, getAllPost,} from '../../Redux/PostReducer/action';

const Comment = ({ userId, avatar, name, comment, commentId, postId, isAccount }) => {


    const dispatch = useDispatch();
    
    const deleteCommenthandler = () => {
        dispatch(deleteComment(postId, commentId));
        if (isAccount) {
            console.log(`bring my post `);
        }
        else {
            dispatch(getAllPost());
        }
    }
    return (
        <>
            <Link to={`/user/${userId}`} className='commenter'>
                <img src={avatar} alt={name} />
            </Link>

                <Box>
                    <Typography>@{name}</Typography>
                    
                    <Typography>{comment} </Typography>
                    <Button style={{color:"red"}} onClick={deleteCommenthandler}> <Delete/> </Button>
                    
                </Box>
                
            

            
            
        </>
    )
}

export default Comment
