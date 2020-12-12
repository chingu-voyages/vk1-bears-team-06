import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { listResorts } from '../actions/resortActions'

const ResortListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const resortList = useSelector(state => state.resortList)
    const { loading, error, resorts } = resortList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.role === 'administrator'){
            dispatch(listResorts())
        } else {
            history.push('/login')
        }
        
    }, [dispatch, history, userInfo])


    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
            // DELETE RESORTS
        }
    }

    const createResortHandler = (id) => {
        if(window.confirm('Are you sure')){
            // DELETE RESORTS
        }
    }
    
    const availableAmenities = []

    return (
        <>


            <h1>Resorts</h1>
    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
       <>
       <button className="my-3" onClick={createResortHandler}>Create Resort</button>
       <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Price Per Night</th>
            <th scope="col">Description</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Website</th>
            <th scope="col">Amenities</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
           {resorts.map(resort => (
               <tr key={resort._id}>
                  <td>{resort._id}</td>
                  <td>{resort.name}</td>
                  <td>{resort.price_per_night}</td>
                  <td>{resort.description}</td>
                  <td>{`${resort.address}, ${resort.city}, ${resort.province}, Philippines ${resort.zip_code}`}</td>
                  <td>{resort.phone}</td>
                  <td>{resort.website}</td>
                  <td>{
                  Object.entries(resort.amenities).map(
                    ([key, value], index, arr) => {
                        return (value && index === arr.length-1) ? <span>{key}</span> : value ? <span>{`${key}, `}</span> : null;
                    })
                 }</td>
                  <td>

                  <Link to={`/admin/resort/${resort._id}/edit`}>
                  <button classNameName="btn btn-sm">
                      EDIT
                  </button>
                  </Link>
      
                   <button classNameName="btn btn-sm" onClick={() => deleteHandler(resort._id)}>
                      DELETE
                  </button>
                  </td>
               </tr>
           ))}
        </tbody>
      </table>
      </>
    )}
        </>
    )
}

export default ResortListScreen
