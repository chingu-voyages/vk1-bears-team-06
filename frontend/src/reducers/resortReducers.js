import { RESORT_LIST_REQUEST, RESORT_LIST_SUCCESS, RESORT_LIST_FAIL } from '../constants/resortConstants'

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