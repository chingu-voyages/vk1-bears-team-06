  
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Resort from './Resort'
import { ListResorts } from '../actions/resortActions'

const PopularResortsList = () => {
    const dispatch = useDispatch()

    const resortList = useSelector(state => state.resortList)
    const { loading, error, resorts } = resortList

    useEffect(() => {
       dispatch(ListResorts())
    }, [dispatch])

    return (
        <> 
    <div className="row">
        { loading ? <h1>Loading..</h1> : error ? <h3>{error}</h3> : 
        resorts.map(resort => <Resort key={resort._id} resort={resort} />)
        }
     </div>
        </>
            
    )
}

export default PopularResortsList