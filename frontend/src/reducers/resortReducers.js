import { 
    RESORT_LIST_REQUEST, 
    RESORT_LIST_SUCCESS, 
    RESORT_LIST_FAIL,
    RESORT_DETAILS_REQUEST,
    RESORT_DETAILS_SUCCESS,
    RESORT_DETAILS_FAIL,
    RESORT_DELETE_REQUEST,
    RESORT_DELETE_SUCCESS,
    RESORT_DELETE_FAIL,
    RESORT_OWNER_DELETE_REQUEST,
    RESORT_OWNER_DELETE_SUCCESS,
    RESORT_OWNER_DELETE_FAIL,
    RESORT_CREATE_REQUEST,
    RESORT_CREATE_SUCCESS,
    RESORT_CREATE_FAIL,
    RESORT_CREATE_RESET,
    RESORT_UPDATE_REQUEST,
    RESORT_UPDATE_SUCCESS,
    RESORT_UPDATE_FAIL,
    RESORT_UPDATE_RESET,
    RESORT_CREATE_REVIEW_REQUEST,
    RESORT_CREATE_REVIEW_SUCCESS,
    RESORT_CREATE_REVIEW_FAIL,
    RESORT_CREATE_REVIEW_RESET,
    RESORT_TOP_REQUEST,
    RESORT_TOP_SUCCESS,
    RESORT_TOP_FAIL,
    RESORT_OWNER_LIST_REQUEST,
    RESORT_OWNER_LIST_SUCCESS,
    RESORT_OWNER_LIST_FAIL,
    RESORT_OWNER_CREATE_REQUEST,
    RESORT_OWNER_CREATE_SUCCESS,
    RESORT_OWNER_CREATE_FAIL,
    RESORT_OWNER_CREATE_RESET,
    RESORT_OWNER_UPDATE_REQUEST,
    RESORT_OWNER_UPDATE_SUCCESS,
    RESORT_OWNER_UPDATE_FAIL,
    RESORT_OWNER_UPDATE_RESET,
    RESORT_OWNER_DETAILS_REQUEST,
    RESORT_OWNER_DETAILS_SUCCESS,
    RESORT_OWNER_DETAILS_FAIL
} from '../constants/resortConstants'

export const resortListReducer = (state = { resorts: [] }, action) => {
   switch(action.type){
      case RESORT_LIST_REQUEST:
          return { loading: true, resorts: [] }
      case RESORT_LIST_SUCCESS:
          return { 
              loading: false, 
              resorts: action.payload.resorts, 
              pages: action.payload.pages, 
              page: action.payload.page
            }
     case RESORT_OWNER_LIST_FAIL:
         return { loading: false, error: action.payload }
     default: 
         return state
   }
}


export const resortOwnerListReducer = (state = { resorts: [] }, action) => {
    switch(action.type){
       case RESORT_OWNER_LIST_REQUEST:
           return { loading: true, resorts: [] }
       case RESORT_OWNER_LIST_SUCCESS:
           return { 
               loading: false, 
               resorts: action.payload.resorts, 
               pages: action.payload.pages, 
               page: action.payload.page
             }
      case RESORT_LIST_FAIL:
          return { loading: false, error: action.payload }
      default: 
          return state
    }
 }

export const resortDetailsReducer = (state = { resort: { reviews: [] } }, action) => {
    switch(action.type){
       case RESORT_DETAILS_REQUEST:
           return { loading: true, ...state }
       case RESORT_DETAILS_SUCCESS:
           return { loading: false, resort: action.payload }
      case RESORT_DETAILS_FAIL:
          return { loading: false, error: action.payload }
      default: 
          return state
    }
 }


 export const resortOwnerDetailsReducer = (state = { resort: { reviews: [] } }, action) => {
    switch(action.type){
       case RESORT_OWNER_DETAILS_REQUEST:
           return { loading: true, ...state }
       case RESORT_OWNER_DETAILS_SUCCESS:
           return { loading: false, resort: action.payload }
      case RESORT_OWNER_DETAILS_FAIL:
          return { loading: false, error: action.payload }
      default: 
          return state
    }
 }



 export const resortDeleteReducer = (state = {}, action) => {
    switch(action.type){
       case RESORT_DELETE_REQUEST:
           return { loading: true }
       case RESORT_DELETE_SUCCESS:
           return { loading: false, success: true }
      case RESORT_DELETE_FAIL:
          return { loading: false, error: action.payload }
      default: 
          return state
    }
 }


 export const resortOwnerDeleteReducer = (state = {}, action) => {
    switch(action.type){
       case RESORT_OWNER_DELETE_REQUEST:
           return { loading: true }
       case RESORT_OWNER_DELETE_SUCCESS:
           return { loading: false, success: true }
      case RESORT_OWNER_DELETE_FAIL:
          return { loading: false, error: action.payload }
      default: 
          return state
    }
 }



 export const resortCreateReducer = (state = {}, action) => {
    switch(action.type){
       case RESORT_CREATE_REQUEST:
           return { loading: true }
       case RESORT_CREATE_SUCCESS:
           return { loading: false, success: true, resort: action.payload }
      case RESORT_CREATE_FAIL:
          return { loading: false, error: action.payload }
      case RESORT_CREATE_RESET:
          return {}
      default: 
          return state
    }
 }


 export const resortOwnerCreateReducer = (state = {}, action) => {
    switch(action.type){
       case RESORT_OWNER_CREATE_REQUEST:
           return { loading: true }
       case RESORT_OWNER_CREATE_SUCCESS:
           return { loading: false, success: true, resort: action.payload }
      case RESORT_OWNER_CREATE_FAIL:
          return { loading: false, error: action.payload }
      case RESORT_OWNER_CREATE_RESET:
          return {}
      default: 
          return state
    }
 }



 export const resortUpdateReducer = (state = { resort: {} }, action) => {
    switch(action.type){
       case RESORT_UPDATE_REQUEST:
           return { loading: true }
       case RESORT_UPDATE_SUCCESS:
           return { loading: false, success: true, resort: action.payload }
      case RESORT_UPDATE_FAIL:
          return { loading: false, error: action.payload }
      case RESORT_UPDATE_RESET:
          return { resort: {} }
      default: 
          return state
    }
 }


 export const resortOwnerUpdateReducer = (state = { resort: {} }, action) => {
    switch(action.type){
       case RESORT_OWNER_UPDATE_REQUEST:
           return { loading: true }
       case RESORT_OWNER_UPDATE_SUCCESS:
           return { loading: false, success: true, resort: action.payload }
      case RESORT_OWNER_UPDATE_FAIL:
          return { loading: false, error: action.payload }
      case RESORT_OWNER_UPDATE_RESET:
          return { resort: {} }
      default: 
          return state
    }
 }

 
 export const resortReviewCreateReducer = (state = {}, action) => {
    switch(action.type){
       case RESORT_CREATE_REVIEW_REQUEST:
           return { loading: true }
       case RESORT_CREATE_REVIEW_SUCCESS:
           return { loading: false, success: true }
      case RESORT_CREATE_REVIEW_FAIL:
          return { loading: false, error: action.payload }
      case RESORT_CREATE_REVIEW_RESET:
          return { }
      default: 
          return state
    }
 }


 export const resortTopRatedReducer = (state = { resorts: [] }, action) => {
    switch(action.type){
       case RESORT_TOP_REQUEST:
           return { loading: true, resorts: [] }
       case RESORT_TOP_SUCCESS:
           return { loading: false, resorts: action.payload}
      case RESORT_TOP_FAIL:
          return { loading: false, error: action.payload }
      default: 
          return state
    }
 }