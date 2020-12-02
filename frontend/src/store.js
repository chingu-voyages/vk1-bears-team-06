import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { resortListReducer, resortDetailsReducer } from './reducers/resortReducers'

const reducer = combineReducers({
    resortList: resortListReducer,
    resortDetails: resortDetailsReducer
})

const intialState = {}

const middleware = [thunk]

const store = createStore(reducer, intialState, composeWithDevTools(
    applyMiddleware(...middleware)))

export default store
