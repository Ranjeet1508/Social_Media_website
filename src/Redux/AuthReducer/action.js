import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS,  SIGNUP_FAILURE,  SIGNUP_REQUEST,  SIGNUP_SUCCESS, } from "./actionTypes";
import axios from 'axios';





export const handleAuthRequest = () => {
    return {
        type: AUTH_REQUEST
    }
}

export const handleAuthSuccess = (payload) => {
    return {
        type: AUTH_SUCCESS,
        payload
    }
}

export const handleAuthFailure = () => {
    return {
        type: AUTH_FAILURE
    }
}


export const handleSignupRequest = () => {
    return {
        type: SIGNUP_REQUEST
    }
}

export const handleSignupSuccess = (payload) => {
    return {
        type: SIGNUP_SUCCESS,
        payload
    }
}

export const handleSignupFailure = () => {
    return {
        type: SIGNUP_FAILURE
    }
}


export const handleLoadUserRequest = () => {
    return {
        type: LOAD_USER_REQUEST
    }
}

export const handleLoadUserSuccess = (payload) => {
    return {
        type: LOAD_USER_SUCCESS,
        payload
    }
}

export const handleLoadUserFailure = () => {
    return {
        type: LOAD_USER_FAILURE
    }
}

export const handleLogoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    }
}

export const handleLogoutSuccess = (payload) => {
    return {
        type: LOGOUT_SUCCESS,
        payload
    }
}

export const handleLogoutFailure = () => {
    return {
        type: LOGOUT_FAILURE
    }
}




export const handleLogin = (email,password) => async(dispatch) => {
    try {
        dispatch(handleAuthRequest());
        let response = await axios.post('https://brainy-crab-rugby-shirt.cyclic.app/user/login', { email, password });
        let token = response.data.token;
        localStorage.setItem("token",token);
        dispatch(handleAuthSuccess(response.data)); 

    } catch (error) {
        dispatch(handleAuthFailure())
        console.log(error)
    }
}

export const loadUser = () => async(dispatch) => {
    try {
        let token = localStorage.getItem("token")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get(`https://brainy-crab-rugby-shirt.cyclic.app/user/me`, config);
        console.log(response.data);
        dispatch(handleLoadUserSuccess(response.data))
    } catch (error) {
        console.log(error)
    }
}

export const logoutMe = () => async(dispatch) => {
    try {
        dispatch(handleLogoutRequest())
        localStorage.removeItem("token");
        dispatch(handleLogoutSuccess(false))       

    } catch (error) {
        dispatch(handleLogoutFailure())
        console.log(error)
    }
}

export const signupUser = (name, email, password, avatar) => async(dispatch) => {
    try {
        dispatch(handleSignupRequest());
        let response = await axios.post(`https://brainy-crab-rugby-shirt.cyclic.app/user/signup`,{
            name,
            email,
            password,         
            avatar
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        dispatch(handleSignupSuccess(response.data))
    } catch (error) {
        dispatch(handleSignupFailure())
        console.log(error)
    }
}
//