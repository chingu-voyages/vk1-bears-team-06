import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import { Modal, Button } from 'react-bootstrap'
import ModalImg from '../assets/images/svg/trash-bin.svg'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import SidebarSettings from '../components/SidebarSettings'
import HeaderBreadcrumb from '../components/HeaderBreadcrumb'
import '../assets/css/admin.css'

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
        <HeaderBreadcrumb title="User List" subtitle="Administrator" />

    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <div className="admin account-body">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 col-md-12 sidebar">
                    <SidebarSettings />
                </div>
                <div className="col-lg-9 col-md-12">
                    
                    <div className="content">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" className="pl-3">#</th>
                                        <th scope="col" className="pl-3">Name</th>
                                        <th scope="col" className="pl-3">Email</th>
                                        <th scope="col" className="pl-3">Phone</th>
                                        <th scope="col" className="pl-3">Role</th>
                                        <th scope="col" className="pl-3">Actions</th>
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
                                          
                                        <Link className="edit" to={`/admin/user/${user._id}/edit`}>Edit</Link>
                                        <Link className="delete" onClick={() => handleShow(user._id)} data-bs-toggle="modal"
                                        data-bs-target="#delete-user">Delete</Link>
                                      
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
    )}


    <Modal className="d-flex justify-content-center align-items-center" show={show} onHide={handleClose}>
            <Modal.Header className="d-flex justify-content-center">
            <div className = "admin">
                <div className = "modal-body">
                    <img className="mb-4" src={ModalImg} alt="" />
                            <Modal.Title>Are You Sure?</Modal.Title>
                            <p className="text-center">Do you really want to delete this user?</p>
                            <p>This action cannot be undone.</p>
                </div>
            </div>
            </Modal.Header>
            <Modal.Footer className="d-flex justify-content-center">
            <Button className="btn-secondary mr-3" variant="primary" onClick={handleClose}>
                Close
            </Button>
            <Button className="btn-danger" variant="primary" onClick={() => deleteHandler(userId)}>
                Delete
            </Button>
            </Modal.Footer>
    </Modal>

        </>
    )
}

export default UserListScreen
