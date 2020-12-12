import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { resortListReducer, resortDetailsReducer, resortDeleteReducer } from './reducers/resortReducers'
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
    resortList: resortListReducer,
    resortDetails: resortDetailsReducer,
    resortDelete: resortDeleteReducer,
    userLogin: userLoginReducer, 
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const intialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, intialState, composeWithDevTools(
    applyMiddleware(...middleware)))

export default store

