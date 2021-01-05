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
        <div className="sub-hero">
        <div className="overlay-img"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 col-sm-12">
                    <div className="sub-content">
                        <h3 className="fweight-500">Admin</h3>
                        <h2 className="fweight-700">Users</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>

        <>
            <div className="sub-hero">
              <div className="overlay-img"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 col-sm-12">
                            <div className="sub-content">
                                <h3 className="fweight-500">Admin</h3>
                                <h2 className="fweight-700">Users</h2>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        

    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <div className="admin account-body">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 col-md-12 sidebar">
                    <div className="list-group">

                        <Link to="/admin/resortslist" className="list-group-item list-group-item-action" aria-current="true">
                            Resorts
                        </Link>
                        <Link to="/admin/userslist" className="list-group-item list-group-item-action active" aria-current="true">Users</Link>
                    </div>
                </div>
                <div className="col-lg-9 col-md-12">
                    

                        <Link to="/" className="list-group-item list-group-item-action" aria-current="true">
                            Resorts
                        </Link>
                        <Link to="/" className="list-group-item list-group-item-action active" aria-current="true">Users</Link>
                    </div>
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
                                          
                                        <Link class="edit" to={`/admin/user/${user._id}/edit`}>Edit</Link>
                                        <Link class="delete" onClick={() => handleShow(user._id)} data-bs-toggle="modal"
                                        data-bs-target="#delete-user">Delete</Link>
                                      
                                        </td>
                                    </tr>
                                ))}

                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">5fe1798bebef0c2db08d4c72</th>
                                        <td>Nicole Jemimah Jerico Tan</td>
                                        <td>email@website.com</td>
                                        <td>222-222-222</td>
                                        <td>Resort Owner</td>
                                        <td>
                                            <Link className="edit" to="/">Edit</Link>
                                            <Link className="delete" to="/" data-bs-toggle="modal"
                                                data-bs-target="#delete-user">Delete</Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5fe1798bebef0c2db08d4c72</th>
                                        <td>Nicole Jemimah Jerico Tan</td>
                                        <td>email@website.com</td>
                                        <td>222-222-222</td>
                                        <td>Resort Owner</td>
                                        <td>
                                            <Link className="edit" to="/">Edit</Link>
                                            <Link className="delete" to="/" data-bs-toggle="modal"
                                                data-bs-target="#delete-user">Delete</Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5fe1798bebef0c2db08d4c72</th>
                                        <td>Nicole Jemimah Jerico Tan</td>
                                        <td>email@website.com</td>
                                        <td>222-222-222</td>
                                        <td>Resort Owner</td>
                                        <td>
                                            <Link className="edit" href="#">Edit</Link>
                                            <Link className="delete" href="#" data-bs-toggle="modal"
                                                data-bs-target="#delete-user">Delete</Link>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item"><Link className="page-link" to="/">1</Link></li>
                            <li className="page-item"><Link className="page-link" to="/">2</Link></li>
                            <li className="page-item"><Link className="page-link" to="/">3</Link></li>
                        </ul>
                    </nav>

                </div>
            </div>
        </div>
    </div>
      
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
