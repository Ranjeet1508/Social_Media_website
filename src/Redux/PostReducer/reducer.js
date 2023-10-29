import { GET_POST_FAILURE, GET_POST_LOADING, GET_POST_SUCCESS, GET_LIKE_UNLIKE, POST_COMMENT_SUCCESS, GET_COMMENT_SUCCESS } from "./actionTypes"



const initialState = {
    postOfUsers:null,
    isLoading:false,
    isError:false,
    countOfLike:0,
    commentsOfPost:null
}

const postReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GET_POST_LOADING: 
            return {
                ...state,
                isLoading:true,
                isError:false
            }

        case GET_POST_SUCCESS: 
            return {
                ...state,
                isLoading:false,
                isError:false,
                postOfUsers:payload,
            }

        case GET_POST_FAILURE:
            return {
                ...state,
                isLoading:false,
                isError:true
            }

        case GET_LIKE_UNLIKE: 
            return {
                ...state,
                countOfLike:payload
            }

        case POST_COMMENT_SUCCESS:
            return{
                ...state,
                commentsOfPost:[...state.commentsOfPost, payload]
            }

        case GET_COMMENT_SUCCESS: 
            return {
                ...state,
                commentsOfPost:payload
            }

        

            
        default:
            return state
    }
}

export {postReducer}