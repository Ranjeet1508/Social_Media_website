import { GET_USER_FAILURE, GET_USER_LOADING, GET_USER_SUCCESS, UPDATE_PASSWORD_FAILURE, UPDATE_PASSWORD_LOADING, UPDATE_PASSWORD_SUCCESS, UPDATE_USERPROFILE_FAILURE, UPDATE_USERPROFILE_LOADING, UPDATE_USERPROFILE_SUCCESS } from "./actionTypes"


const initialState = {
    allUsers: null,
    isLoading: false,
    isError: false,
    updateUserLoading: false,
    updateUserSuccess: false,
    updateUserMsg: "",
    updateUserError: false,
    updatePasswordLoading: false,
    updatePasswordSuccess: false,
    updatePasswordMsg: "",
    updatePasswordError: false
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_USER_LOADING:
            return {
                ...state,
                isLoading: true,
                isError: false
            }

        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                allUsers: payload
            }

        case GET_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case UPDATE_USERPROFILE_LOADING:
            return {
                ...state,
                updateUserLoading: true,
                updateUserError: false,
            }

        case UPDATE_USERPROFILE_SUCCESS:
            return {
                ...state,
                updateUserLoading: false,
                updateUserError: false,
                updateUserSuccess: true,
                updateUserMsg: payload
            }

        case UPDATE_USERPROFILE_FAILURE:
            return {
                ...state,
                updateUserLoading: false,
                updateUserError: true,
            }

        case UPDATE_PASSWORD_LOADING:
            return {
                ...state,
                updatePasswordLoading: true,
                updatePasswordError: false,
            }

        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                updatePasswordLoading: false,
                updatePasswordError: false,
                updatePasswordSuccess: true,
                updatePasswordMsg: payload
            }

        case UPDATE_PASSWORD_FAILURE:
            return {
                ...state,
                updatePasswordLoading: false,
                updatePasswordError: true,
            }

        default:
            return state
    }
}

export { userReducer }