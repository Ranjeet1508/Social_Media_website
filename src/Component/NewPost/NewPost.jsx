import React, { useState } from 'react'
import './newpost.css'
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPost } from '../../Redux/AccountReducer/action';


const NewPost = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const dispatch = useDispatch();
    const uploadMsg = useSelector((state => state.myPostReducer.uploadMsg))

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImage(Reader.result)
            }
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(uploadPost(caption, image))
        setTimeout(() => {
            setImage(null);
            setCaption("");
        },5000)
    }

    return (
        <div className='newPost'>
            <form className='newPostForm' onSubmit={submitHandler}>
                <Typography variant='h3'>New Post</Typography>
                {image && <img src={image} alt='post' />}
                <input type="file" accept='image/*' onChange={handleImageChange} />
                <input
                    type="text"
                    placeholder='write something about your post...'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}

                />
                <Button type='submit'>Post</Button>
                <div className="uploadingMsg">
                    {uploadMsg}
                </div>
            </form>

        </div>
    )
}

export default NewPost
