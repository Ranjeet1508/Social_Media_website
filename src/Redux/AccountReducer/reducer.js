import { GET_MY_POST_FAILURE, GET_MY_POST_REQUEST, GET_MY_POST_SUCCESS, UPLOAD_POST_FAILURE, UPLOAD_POST_LOADING, UPLOAD_POST_SUCCESS } from "./actionTypes"



const initialState = {
    isLoading: false,
    isError: false,
    myPosts: null,
    imgUpload:false,
    imgUploadError:false,
    uploadMsg:null
}

const myPostReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_MY_POST_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }

        case GET_MY_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                myPosts: payload
            }

        case GET_MY_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case UPLOAD_POST_LOADING:
            return {
                ...state,
                imgUpload: true,
                imgUploadError: false,
                uploadMsg:"Uploading..."
            }

        case UPLOAD_POST_SUCCESS:
            return {
                ...state,
                imgUpload: false,
                imgUploadError: false,
                uploadMsg:payload.message
            }

        case UPLOAD_POST_FAILURE:
            return {
                ...state,
                imgUpload: false,
                imgUploadError: true,
                uploadMsg:"Can't upload this Post"
            }

        default:
            return state
    }
}


export { myPostReducer }