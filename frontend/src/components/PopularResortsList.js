  
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Resort from './Resort'
import Message from './Message'
import Loader from './Loader'
import { listResorts } from '../actions/resortActions'

const PopularResortsList = () => {
    const dispatch = useDispatch()

    const resortList = useSelector(state => state.resortList)
    const { loading, error, resorts } = resortList

    useEffect(() => {
       dispatch(listResorts())
    }, [dispatch])

    return (
        <> 
    <div className="row">
      { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
        resorts.map(resort => <Resort key={resort._id} resort={resort} />)
        }
     </div>
        </>    
    )
}

export default PopularResortsList