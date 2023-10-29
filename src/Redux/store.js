import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import { authReducer } from './AuthReducer/reducer';
import { postReducer } from './PostReducer/reducer';
import { userReducer } from './UserReducer/userReducer';
import { myPostReducer } from './AccountReducer/reducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    authReducer,
    postReducer,
    userReducer,
    myPostReducer
})


const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export {store}