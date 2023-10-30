import { DELETE_POST, GET_MY_POST_FAILURE, GET_MY_POST_REQUEST, GET_MY_POST_SUCCESS, UPLOAD_POST_FAILURE, UPLOAD_POST_LOADING, UPLOAD_POST_SUCCESS } from "./actionTypes"
import axios from 'axios';


export const myPostRequest = () => {
    return{
        type: GET_MY_POST_REQUEST
    }
}

export const myPostSuccess = (payload) => {
    return{
        type: GET_MY_POST_SUCCESS,
        payload
    }
}

export const myPostFailure = () => {
    return{
        type: GET_MY_POST_FAILURE
    }
}

export const uploadPostLoading = () => {
    return {
        type: UPLOAD_POST_LOADING
    }
}

export const uploadPostSuccess = (payload) => {
    return {
        type: UPLOAD_POST_SUCCESS,
        payload
    }
}

export const uploadPostFailure = () => {
    return {
        type: UPLOAD_POST_FAILURE
    }
}

export const deletePostSuccess = () => {
    return {
        type: DELETE_POST
    }
}



// ----------------function-----------------

export const getMyPost = () => async(dispatch) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        dispatch(myPostRequest());
        let response = await axios.get(`http://localhost:8080/post/myAllPost`, config);
        dispatch(myPostSuccess(response.data.posts));
    } catch (error) {
        dispatch(myPostFailure());
        console.log(error)
    }

}





export const uploadPost = (caption, image) => async (dispatch) => {
    try {
        let token = localStorage.getItem("token")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
            }
        }
        const data = {
            caption: caption,
            image: image
        }
        dispatch(uploadPostLoading())
        const response = await axios.post('http://localhost:8080/post/upload', data, config);
        console.log(response.data);
        dispatch(uploadPostSuccess(response.data));
     
      
    } catch (error) {
        dispatch(uploadPostFailure())
        console.log(error);
    }
}


export const deleteMyPost = (id) => async(dispatch) => {
    try {
        let token = localStorage.getItem("token")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
            }
        }
        let response = await axios.delete(`http://localhost:8080/post/delete/${id}`, config);
        console.log(response.data)
        deletePostSuccess();
    } catch (error) {
        console.log(error)
    }
}


export const deleteMyAccount = () => async(dispatch) => {
    try {
        let token = localStorage.getItem("token")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
            }
        }
        let response = await axios.delete(`http://localhost:8080/user/deleteAccount`, config);
        console.log(response.data)
    } catch (error) {
        console.log(error);
    }
}

export const forgetPassword = (email) => async(dispatch) => {
    try {
        let data = {
            email: email
        }
        let response = await axios.post(`http://localhost:8080/user/forgotPassword`, data);
        console.log(response.data)
        console.log("sent Successfully");
    } catch (error) {
        console.log("cant send ")
        console.log(error);
    }
}

export const resetPassword = (token, password) => async(dispatch) => {
    try {
        let data = {
            password: password
        }
        let response = await axios.post(`http://localhost:8080/user/resetPassword/${token}`, data);
        console.log("Password Reset Successfully");
    } catch (error) {
        console.log(error);
    }
}


