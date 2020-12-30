import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    resortListReducer, 
    resortOwnerListReducer,
    resortDetailsReducer, 
    resortOwnerDetailsReducer,
    resortDeleteReducer,
    resortOwnerDeleteReducer,
    resortCreateReducer,
    resortOwnerCreateReducer,
    resortUpdateReducer,
    resortOwnerUpdateReducer,
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
    resortOwnerList: resortOwnerListReducer,
    resortDetails: resortDetailsReducer,
    resortOwnerDetails: resortOwnerDetailsReducer,
    resortDelete: resortDeleteReducer,
    resortOwnerDelete: resortOwnerDeleteReducer,
    resortCreate: resortCreateReducer,
    resortOwnerCreate: resortOwnerCreateReducer,
    resortUpdate: resortUpdateReducer,
    resortOwnerUpdate: resortOwnerUpdateReducer,
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

