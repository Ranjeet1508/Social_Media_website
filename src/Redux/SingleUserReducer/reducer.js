import { FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, SINGLE_USER_FAILURE, SINGLE_USER_REQUEST, SINGLE_USER_SUCCESS } from "./actionTypes"



const initialState = {
    isLoading: false,
    isError: false,
    singleUser: null,
    followLoading: false,
    followError: false,
    followUserMsg: null,
}


const singleUserReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SINGLE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }

        case SINGLE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                singleUser: payload
            }

        case SINGLE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case FOLLOW_USER_REQUEST:
            return {
                ...state,
                followLoading: true,
                followError: false
            }

        case FOLLOW_USER_SUCCESS:
            return {
                ...state,
                followLoading: false,
                followError: false,
                followUserMsg: payload
            }

        case FOLLOW_USER_FAILURE:
            return {
                ...state,
                followLoading: false,
                followError: true
            }

        default:
            return state
    }
}

export { singleUserReducer }