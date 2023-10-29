import {AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS} from './actionTypes';

const initialState = {
    isAuth:null,
    isUser:null,
    isLoading:false,
    isError:false,
    signupLoading:false,
    signupError:false,
    signupSuccess:false,
    signUpMsg:""
}

const authReducer = (state=initialState, {type,payload}) => {
    switch(type){
        case AUTH_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError:true,
                isAuth:false
            }

        case AUTH_REQUEST:
            return {
                ...state,
                isLoading:true,
                isError:false,
                isAuth:false
            }

        case AUTH_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false,
                isUser:payload.isUser,
                isAuth:payload.success
            }

        case LOAD_USER_FAILURE:{
            return{
                ...state,
                isLoading:false,
                isError:true,
            }
        }

        case LOAD_USER_REQUEST:{
            return{
                ...state,
                isLoading:true,
                isError:false,
            }
        }

        case LOAD_USER_SUCCESS: {
            return{
                ...state,
                isLoading:false,
                isError:false,
                isAuth:payload.success,
                isUser:payload.user
            }
        }

        case LOGOUT_FAILURE:{
            return{
                ...state,
                isLoading:false,
                isError:true,
            }
        }

        case LOGOUT_REQUEST:{
            return{
                ...state,
                isLoading:true,
                isError:false,
            }
        }
        

        case LOGOUT_SUCCESS: {
            return{
                ...state,
                isLoading:false,
                isError:false,
                isAuth:null,
                isUser:null
            }
        }

        case SIGNUP_REQUEST: {
            return {
                ...state,
                signupLoading:true,
                signupError:false
            }
        }

        case SIGNUP_SUCCESS: {
            return {
                ...state,
                signupLoading:false,
                signupError:false,
                signupSuccess:true,
                signUpMsg:payload.message
            }
        }

        case SIGNUP_FAILURE: {
            return {
                ...state,
                signupError:true,
                signupLoading:false,
            }
        }

        default: 
            return state
    }
}

export {authReducer}