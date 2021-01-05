  
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
        <div class="most-popular section pt-80">
            <div class="container">
                <div className="row">
                    <div className="col-lg-12 title-card-container">
                        <div className="title">
                            <p className="fweight-500 subtitle">Browse 600+ Destinations</p>
                            <h3 className="fweight-700">Most Popular Resorts</h3>
                        </div>
                    </div>
                    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                        resorts.map(resort => <Resort key={resort._id} resort={resort} />)
                    }
                </div>
            </div>
        </div>
        </>    
    )
}

export default PopularResortsList