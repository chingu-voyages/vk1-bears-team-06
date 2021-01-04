import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import { Modal, Button } from 'react-bootstrap'

import  Message from '../components/Message'
import  Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { 
    listOwnerResorts,
    deleteResortOwner
} from '../actions/resortActions'


const ResortListOwnerScreen = ({ history, match }) => {

    const [show, setShow] = useState(false)
    const [resortId, setResortId] = useState(0)
    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setShow(true)
        setResortId(id)
    }

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const resortOwnerList = useSelector(state => state.resortOwnerList)
    const { loading, error, resorts, page, pages } = resortOwnerList

    const resortOwnerDelete = useSelector(state => state.resortOwnerDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = resortOwnerDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo.role !== 'resortOwner' || userInfo._id !== match.params.userid){
            history.push('/')
        } 

        if(successDelete){
            store.addNotification({
                title: 'Success!',
                message: 'Resort successfully deleted.',
                type: 'success',                       
                container: 'top-right',               
                animationIn: ["animate__animated", "animate__fadeInRight"],   
                animationOut: ["animate__animated", "animate__fadeOutRight"],  
                dismiss: {
                  duration: 4000
                }
              })
              setShow(false)
        }

         dispatch(listOwnerResorts(userInfo._id, pageNumber))

        
    }, [dispatch, history, userInfo, successDelete, match.params.userid, pageNumber])


    const deleteHandler = (id) => {
            dispatch(deleteResortOwner(id))
    }

    return (
        <>

    <h1>Resorts</h1>
     { loadingDelete && <Loader />}      
    { errorDelete && <Message variant='danger'>{errorDelete}</Message>}      
    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    
    <>
       <Link to={`/resort-owner/${userInfo._id}/resorts/create`}>Create Resort</Link>
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

                  <Link to={`/resort-owner/${userInfo._id}/resort/${resort._id}/edit`}>
                  <button classNameName="btn btn-sm">
                      EDIT
                  </button>
                  </Link>
      
                  <button classNameName="btn btn-sm" onClick={() => handleShow(resort._id)}>DELETE</button> 
                  </td>
               </tr>
           ))}
        </tbody>
      </table>
     

       <Paginate pages={pages} page={page} resortOwnerId={userInfo._id}/>

       <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Resort Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Resort?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => deleteHandler(resortId)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      </>
    )}
        </>
    )
}

export default ResortListOwnerScreen
