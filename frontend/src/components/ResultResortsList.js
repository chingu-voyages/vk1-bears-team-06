  
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Resort from './Resort'
import Message from './Message'
import Loader from './Loader'
import { listResorts } from '../actions/resortActions'
import Paginate from '../components/Paginate'

const ResultResortsList = ({ keywordInput, pageNumber }) => {
    const dispatch = useDispatch()

    const resortList = useSelector(state => state.resortList)
    const { loading, error, resorts, page, pages } = resortList

    useEffect(() => {
       dispatch(listResorts(keywordInput, pageNumber))
    }, [dispatch, keywordInput, pageNumber])

    return (
        <> 
    <div className="row">
      { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
        resorts.map(resort => <Resort key={resort._id} resort={resort} />)
        }
        <Paginate pages={pages} page={page} keywordInput={keywordInput ? keywordInput : ''} />
     </div>
        </>    
    )
}

export default ResultResortsList