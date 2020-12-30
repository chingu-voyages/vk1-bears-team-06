import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { 
    listResorts, 
    deleteResort
} from '../actions/resortActions'


const ResortListAdminScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const resortList = useSelector(state => state.resortList)
    const { loading, error, resorts } = resortList

    const resortDelete = useSelector(state => state.resortDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = resortDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const resortCreate = useSelector(state => state.resortCreate)
    const { 
        loading:loadingCreate, 
        error:errorCreate, 
        success:successCreate,
        resort:createdResort 
    } = resortCreate

    useEffect(() => {

        if(userInfo.role !== 'administrator'){
            history.push('/')
        } 

         dispatch(listResorts())

        
    }, [dispatch, history, userInfo, successDelete, successCreate, createdResort])


    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
            dispatch(deleteResort(id))
        }
    }

    return (
        <>

    <h1>Resorts</h1>
     { loadingDelete && <Loader />}      
    { errorDelete && <Message variant='danger'>{errorDelete}</Message>}    
    { loadingCreate && <Loader />}      
    { errorCreate && <Message variant='danger'>{errorCreate}</Message>}    
    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    
    <>
       <Link to='/admin/resorts/create'>Create Resort</Link>
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

export default ResortListAdminScreen
