import { GET_POST_FAILURE, GET_POST_LOADING, GET_POST_SUCCESS, GET_LIKE_UNLIKE, POST_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS, GET_COMMENT_SUCCESS} from "./actionTypes";
import axios from 'axios';


export const getPostLoading = () => {
    return {
        type: GET_POST_LOADING
    }
}

export const getPostSuccess = (payload) => {
    return {
        type: GET_POST_SUCCESS,
        payload
    }
}

export const getPostFailure = () => {
    return {
        type: GET_POST_FAILURE
    }
}

export const getLikeUnlike = (payload) => {
    return {
        type: GET_LIKE_UNLIKE,
        payload
    }
}

export const getCommentsOfPost = (payload) => {
    return {
        type: GET_COMMENT_SUCCESS,
        payload
    }
}

export const putCommentSuccess = (payload) => {
    return {
        type: POST_COMMENT_SUCCESS,
        payload
    }
}

export const deleteCommentSuccess = () => {
    return{
        type: DELETE_COMMENT_SUCCESS
    }
}




//-----------------FUNCTIONS--------------

export const getAllPost = () => async (dispatch) => {
    try {
        let token = localStorage.getItem("token")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        dispatch(getPostLoading());
        const response = await axios.get('http://localhost:8080/post/allPost', config);
        dispatch(getPostSuccess(response.data.posts))
    } catch (error) {
        dispatch(getPostFailure());
        console.log(error);
    }
}


export const likeUnlikePost = (id) => async (dispatch) => {
    try {
        let token = localStorage.getItem("token")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get(`http://localhost:8080/post/like_Unlike/${id}`, config);
        dispatch(getLikeUnlike(response.data.posts));
    } catch (error) {
        console.log(error)
    }
}

export const getallComments = (postId) => async(dispatch) => {
    try {
        let token = localStorage.getItem("token")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        let response = await axios.get(`http://localhost:8080/comment/${postId}`, config);
        console.log(response.data);
        dispatch(getCommentsOfPost(response.data.comments));
    } catch (error) {
        console.log(error);
    }
}

export const addCommentsOnPost = (id, comment) => async(dispatch) => {
    try {
        let token = localStorage.getItem("token")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const data = {
            comment: comment,
        };
        let response = await axios.put(`http://localhost:8080/comment/add/${id}`, data, config);
        console.log(response.data)
    } catch (error) {
        console.log(error);
    }
}


export const deleteComment = (postId, commentId) => async(dispatch) => {
    try {
        let token = localStorage.getItem("token")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
        let response = axios.delete(`http://localhost:8080/comment/delete/${postId}?commentId=${commentId}`, config);
        console.log(response.data);
        dispatch(deleteCommentSuccess());
        console.log("comment deleted successfully")
    } catch (error) {
        console.log(error)
    }
}





