import { 
    RESORT_LIST_REQUEST, 
    RESORT_LIST_SUCCESS, 
    RESORT_LIST_FAIL,
    RESORT_DETAILS_REQUEST,
    RESORT_DETAILSSUCCESS,
    RESORT_DETAILS_FAIL
} from '../constants/resortConstants'

export const resortListReducer = (state = { resorts: [] }, action) => {
   switch(action.type){
      case RESORT_LIST_REQUEST:
          return { loading: true, resorts: [] }
      case RESORT_LIST_SUCCESS:
          return { loading: false, resorts: action.payload }
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
       case RESORT_DETAILSSUCCESS:
           return { loading: false, resort: action.payload }
      case RESORT_DETAILS_FAIL:
          return { loading: false, error: action.payload }
      default: 
          return state
    }
 }