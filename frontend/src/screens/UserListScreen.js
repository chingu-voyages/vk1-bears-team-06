import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import { Modal, Button } from 'react-bootstrap'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = ({ history }) => {

    const [show, setShow] = useState(false)
    const [userId, setUserId] = useState(0)
    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setShow(true)
        setUserId(id)
    }
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.role === 'administrator'){
            dispatch(listUsers())
        } else {
            history.push('/login')
        }

        if(successDelete){
            store.addNotification({
                title: 'Success!',
                message: 'User successfully deleted.',
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
        
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {
            dispatch(deleteUser(id))
    }

    return (
        <>
            <h1>Users</h1>
    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
           {users.map(user => (
               <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                  <button classNameName="btn btn-sm">
                      EDIT
                  </button>
                  </Link>
      
                   <button classNameName="btn btn-sm" onClick={() => handleShow(user._id)}>
                      DELETE
                  </button>
                  </td>
               </tr>
           ))}
        </tbody>
      </table>
      
    )}


<Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete User Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this User?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => deleteHandler(userId)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

        </>
    )
}

export default UserListScreen
