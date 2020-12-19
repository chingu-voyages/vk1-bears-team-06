import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    resortListReducer, 
    resortDetailsReducer, 
    resortDeleteReducer,
    resortCreateReducer,
    resortUpdateReducer,
    resortReviewCreateReducer,
    resortTopRatedReducer
} from './reducers/resortReducers'

import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userActivateReducer
} from './reducers/userReducers'

const reducer = combineReducers({
    resortList: resortListReducer,
    resortDetails: resortDetailsReducer,
    resortDelete: resortDeleteReducer,
    resortCreate: resortCreateReducer,
    resortUpdate: resortUpdateReducer,
    resortReviewCreate: resortReviewCreateReducer,
    resortTopRated: resortTopRatedReducer,
    userLogin: userLoginReducer, 
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userActivate: userActivateReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const intialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, intialState, composeWithDevTools(
    applyMiddleware(...middleware)))

export default store

