  
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Resort from './Resort'
import Message from './Message'
import Loader from './Loader'
import { listTopResorts } from '../actions/resortActions'

const PopularResortsList = () => {
    const dispatch = useDispatch()

    const resortTopRated = useSelector(state => state.resortTopRated)
    const { loading, error, resorts } = resortTopRated

    useEffect(() => {
       dispatch(listTopResorts())
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