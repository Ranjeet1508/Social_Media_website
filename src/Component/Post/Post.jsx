import { Avatar, Button, Typography, Dialog } from '@mui/material';
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Post.css';
import { useDispatch, useSelector } from 'react-redux'
import { addCommentsOnPost, getAllPost, likeUnlikePost } from '../../Redux/PostReducer/action';
import User from '../User/User';
import Comment from '../Comments/Comment';
import { deleteMyPost, getMyPost } from '../../Redux/AccountReducer/action';
import { loadUser } from '../../Redux/AuthReducer/action';


const Post = ({
    postId,
    caption,
    postImage,
    likes,
    commentsOnPost,
    ownerImage,
    ownerName,
    ownerId,
    isDelete,
    isAccount
}) => {


    const [liked, setLiked] = useState(false);
    const [likesUser, setLikesUser] = useState(false);
    const [comment, setComment] = useState("");
    const [commentBox, setCommentBox] = useState(false);
    const userId = useSelector((state => state.authReducer.isUser._id));


    const dispatch = useDispatch();

    const handleLike = async () => {
        try {
            setLiked(!liked);
            await dispatch(likeUnlikePost(postId));
            if (isAccount) {
                await dispatch(getMyPost())
            }
            else {
                await dispatch(getAllPost());
            }
        } catch (error) {
            console.log(error)
        }
    }


    const addCommentHandler = async(e) => {
        e.preventDefault();
        await dispatch(addCommentsOnPost(postId, comment));
        if (isAccount) {
            dispatch(getMyPost())
        }
        else {
            dispatch(getAllPost())
        }
        setComment("")
    }

    const openCommentBox = () => {
        setCommentBox(true)
    }

    const handleDeletePost = async() => {
        await dispatch(deleteMyPost(postId));
        dispatch(getMyPost());
        dispatch(loadUser())
    }


    useEffect(() => {
        likes.forEach((item) => {
            if (item._id === userId) {
                setLiked(true)
            }
        })
    }, [likes, userId])


    return (
        <div className='post'>

            <div className="postHeader">
                {isAccount ? (
                    <Button>
                        <MoreVert />
                    </Button>
                ) : null}
            </div>

            <div className="postImage">
                <img src={postImage} alt="Post" />
            </div>


            <div className="postDetails">
                <Avatar
                    src={ownerImage} alt="User" sx={{
                        height: "3vmax",
                        width: "3vmax"
                    }} />


                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={600}>
                        {ownerName}
                    </Typography>
                </Link>
            </div>

            <div className="caption">
                <Typography
                    fontWeight={100}
                    color='rgba(0,0,0,0.582)'
                    style={{ alignSelf: "center" }}
                >
                    {caption}
                </Typography>
            </div>



            <button
                style={{
                    border: "none",
                    backgroundColor: "white",
                    cursor: 'pointer',
                    margin: "1vmax 2vmax",
                    display: 'flex'
                }}
                onClick={() => setLikesUser(true)}
                disabled={likes.length === 0}
            >
                <Typography>{`${likes.length} Likes`}</Typography>
            </button>


            <div className="postFooter">

                <Button onClick={handleLike}>
                    {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
                </Button>

                <Button onClick={openCommentBox}>
                    <ChatBubbleOutline />
                </Button>

                {isDelete ?
                    <Button onClick={handleDeletePost}>
                        <DeleteOutline />
                    </Button>
                    : null}
            </div>

            <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                <div className="DialogBox">
                    <Typography variant='h4'>Liked by</Typography>
                    {likes.map((user, idx) =>
                        <User
                            key={idx}
                            userId={user._id}
                            name={user.name}
                            avatar={user.avatar.url} />
                    )
                    }
                </div>
            </Dialog>



            <Dialog open={commentBox} onClose={() => setCommentBox(!commentBox)}>
                <div className="DialogBox">
                    <Typography variant='h4'>Comments</Typography>
                    <form className='commentForm' onSubmit={addCommentHandler}>
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Comment here....'
                            required
                        />

                        <Button type='submit' variant='contained'>
                            Add
                        </Button>
                    </form>
                    {commentsOnPost.length > 0 ? (
                        commentsOnPost.map((user, idx) =>
                            <Comment
                                key={idx}
                                userId={user.user._id}
                                name={user.user.name}
                                avatar={user.user.avatar.url}
                                comment={user.comment}
                                commentId={user._id}
                                postId={postId}
                                isAccount={isAccount}
                            />
                        )
                    ) : (
                        <Typography>No comments yet</Typography>
                    )
                    }
                </div>
            </Dialog>

        </div>
    )
}

export default Post
