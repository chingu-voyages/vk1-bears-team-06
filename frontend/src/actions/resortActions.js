import axios from 'axios'
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
    RESORT_CREATE_REQUEST,
    RESORT_CREATE_SUCCESS,
    RESORT_CREATE_FAIL,
    RESORT_UPDATE_REQUEST,
    RESORT_UPDATE_SUCCESS, 
    RESORT_UPDATE_FAIL,
    RESORT_CREATE_REVIEW_REQUEST,
    RESORT_CREATE_REVIEW_SUCCESS,
    RESORT_CREATE_REVIEW_FAIL,
    RESORT_CREATE_REVIEW_RESET
} from '../constants/resortConstants'

export const listResorts = () => async (dispatch) => {
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


export const listResortDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: RESORT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/resorts/${id}`)

        dispatch({
            type: RESORT_DETAILS_SUCCESS,
            payload: data
        })
    
    } catch (error) {
       dispatch({
           type: RESORT_DETAILS_FAIL,
           payload: error.response && error.response.data.message ? 
           error.response.data.message : error.message
       })
    }
}  


export const deleteResort = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: RESORT_DELETE_REQUEST })
        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/resorts/${id}`, config)

        dispatch({
            type: RESORT_DELETE_SUCCESS
        })
    
    } catch (error) {
       dispatch({
           type: RESORT_DELETE_FAIL,
           payload: error.response && error.response.data.message ? 
           error.response.data.message : error.message
       })
    }
}  



export const createResort = () => async (dispatch, getState) => {
    try {
        dispatch({ type: RESORT_CREATE_REQUEST })
        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/resorts`, {},  config)

        dispatch({
            type: RESORT_CREATE_SUCCESS,
            payload: data
        })
    
    } catch (error) {
       dispatch({
           type: RESORT_CREATE_FAIL,
           payload: error.response && error.response.data.message ? 
           error.response.data.message : error.message
       })
    }
}  




export const updateResort = (resort) => async (dispatch, getState) => {
    try {
        dispatch({ type: RESORT_UPDATE_REQUEST })
        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/resorts/${resort._id}`, resort, config)

        dispatch({
            type: RESORT_UPDATE_SUCCESS,
            payload: data
        })
    
    } catch (error) {
       dispatch({
           type: RESORT_UPDATE_FAIL,
           payload: error.response && error.response.data.message ? 
           error.response.data.message : error.message
       })
    }
}  




export const createResortReview = (resortId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: RESORT_CREATE_REVIEW_REQUEST })
        
        const { userLogin: { userInfo } } = getState()
 
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/resorts/${resortId}/reviews`, review, config)

        dispatch({
            type: RESORT_CREATE_REVIEW_SUCCESS,
        })
    
    } catch (error) {
       dispatch({
           type: RESORT_CREATE_REVIEW_FAIL,
           payload: error.response && error.response.data.message ? 
           error.response.data.message : error.message
       })
    }
}  