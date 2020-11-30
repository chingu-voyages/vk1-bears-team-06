import axios from 'axios'
import { 
    RESORT_LIST_REQUEST, 
    RESORT_LIST_SUCCESS, 
    RESORT_LIST_FAIL 
} from '../constants/resortConstants'


export const ListResorts = () => async (dispatch) => {
    try {
        dispatch({ type: RESORT_LIST_REQUEST })
        const { data } = await axios.get('/api/resorts')

        dispatch({
            type: RESORT_LIST_SUCCESS,
            payload: data
        })
    
    } catch (error) {
       dispatch({
           type: RESORT_LIST_FAIL,
           payload: error.response && error.response.data.message ? 
           error.response.data.message : error.message
       })
    }
}