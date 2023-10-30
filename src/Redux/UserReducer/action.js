import { GET_USER_FAILURE, GET_USER_LOADING, GET_USER_SUCCESS, UPDATE_PASSWORD_FAILURE, UPDATE_PASSWORD_LOADING, UPDATE_PASSWORD_SUCCESS, UPDATE_USERPROFILE_FAILURE, UPDATE_USERPROFILE_LOADING, UPDATE_USERPROFILE_SUCCESS } from "./actionTypes"
import axios from "axios"


export const getUserLoading = () => {
    return{
        type:GET_USER_LOADING
    }
}

export const getUserSuccess = (payload) => {
    return{
        type:GET_USER_SUCCESS,
        payload
    }
}

export const getUserFailure = () => {
    return{
        type:GET_USER_FAILURE
    }
}

export const updateUserProfileLoading = () => {
    return{
        type:UPDATE_USERPROFILE_LOADING
    }
}

export const updateUserProfileSuccess = (payload) => {
    return{
        type:UPDATE_USERPROFILE_SUCCESS,
        payload
    }
}

export const updateUserProfileFailure = () => {
    return{
        type:UPDATE_USERPROFILE_FAILURE
    }
}

export const updatePasswordLoading = () => {
    return{
        type:UPDATE_PASSWORD_LOADING
    }
}

export const updatePasswordSuccess = (payload) => {
    return{
        type:UPDATE_PASSWORD_SUCCESS,
        payload
    }
}

export const updatePasswordFailure = () => {
    return{
        type:UPDATE_PASSWORD_FAILURE
    }
}

export const getAllUsers = () => async(dispatch) => {
    try {
        dispatch(getUserLoading);
        let token = localStorage.getItem("token")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get('https://tasty-fez-goat.cyclic.app/user/allUser', config);
        dispatch(getUserSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(getUserFailure());
    }
}

export const updateUserProfile = (name, email, avatar) => async(dispatch) => {
    try {
        let token = localStorage.getItem("token")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const data = {
            name: name,
            email: email,
            avatar: avatar
        }
        dispatch(updateUserProfileLoading());
        const response = await axios.post('https://tasty-fez-goat.cyclic.app/user/updateProfile', data, config);
        dispatch(updateUserProfileSuccess(response.data.message))
    } catch (error) {
        dispatch(updateUserProfileFailure())
        console.log(error)
    }
}

export const updatePassword = (oldPassword, newPassword) => async(dispatch) => {
    try {
        let token = localStorage.getItem("token")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const data = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        dispatch(updatePasswordLoading());
        const response = await axios.post('https://tasty-fez-goat.cyclic.app/user/updatePassword', data, config);
        console.log(response.data)
        dispatch(updatePasswordSuccess(response.data.message))
    } catch (error) {
        dispatch(updatePasswordFailure())
        console.log(error)
    }
}