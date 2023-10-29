import { FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, SINGLE_USER_FAILURE, SINGLE_USER_REQUEST, SINGLE_USER_SUCCESS } from "./actionTypes"
import axios from "axios"

export const getSingleUserRequest = () => {
    return{
        type: SINGLE_USER_REQUEST
    }
}


export const getSingleUserSuccess = (payload) => {
    return {
        type: SINGLE_USER_SUCCESS,
        payload
    }
}


export const getSingleUserFailure = () => {
    return {
        type: SINGLE_USER_FAILURE
    }
}


export const followUserRequest = () => {
    return {
        type: FOLLOW_USER_REQUEST
    }
}


export const followUserSuccess = (payload) => {
    return {
        type: FOLLOW_USER_SUCCESS,
        payload
    }
}

export const followUserFailure = () => {
    return {
        type: FOLLOW_USER_FAILURE
    }
}



// funciton


export const singleUser = (id) => async(dispatch) => {
    try {
        let token = localStorage.getItem("token");

        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        dispatch(getSingleUserRequest())
        let response = await axios.get(`http://localhost:8080/user/findUser/${id}`, config)
        console.log(response.data)
        dispatch(getSingleUserSuccess(response.data.user))
    } catch (error) {
        dispatch(getSingleUserFailure())
        console.log(error)
    }
}

export const followUnfollowUser = (id) => async(dispatch) => {
    try {
        let token = localStorage.getItem("token");

        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        followUserRequest()
        let response = await axios.get(`http://localhost:8080/follow/${id}`, config)
        followUserSuccess(response.data.message);
    } catch (error) {
        followUserFailure();
        console.log(error)
    }
}