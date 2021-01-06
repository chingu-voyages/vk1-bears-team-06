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
    listResorts, 
    deleteResort
} from '../actions/resortActions'


const ResortListAdminScreen = ({ history, match }) => {

    const [show, setShow] = useState(false)
    const [resortId, setResortId] = useState(0)
    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setShow(true)
        setResortId(id)
    }

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const resortList = useSelector(state => state.resortList)
    const { loading, error, resorts, page, pages } = resortList

    const resortDelete = useSelector(state => state.resortDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = resortDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if(userInfo.role !== 'administrator'){
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

         dispatch(listResorts(keyword, pageNumber))

        
    }, [dispatch, history, userInfo, successDelete, keyword, pageNumber])


    const deleteHandler = (id) => {
        dispatch(deleteResort(id)
    )}

        <Paginate pages={pages} page={page} />

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



return (
    <>
        <div className="sub-hero">
            <div className="overlay-img"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2 col-sm-12">
                        <div className="sub-content">
                            <h3 className="fweight-500">Admin</h3>
                            <h2 className="fweight-700">Resorts</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        { loadingDelete && <Loader />}      
        { errorDelete && <Message variant='danger'>{errorDelete}</Message>}     
        { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <div className="admin account-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 sidebar">
                            <div className="list-group">
                                <Link to="/" className="list-group-item list-group-item-action active" aria-current="true">
                                    Resorts
                                </Link>
                                <Link to="/" className="list-group-item list-group-item-action" disabled>My Reviews <span
                                        className="fweight-500">(Coming Soon)</span></Link>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12">
                            <div className="new-resort">
                                <Link to='/admin/resorts/create' className="btn">Create New Resort</Link>
                            </div>
                            <div className="content">

                                {resorts.map(resort => (

                                <div className="card">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-5 col-sm-12">
                                            <div className="img-resort">
                                                <img src={resort.image} alt=""/>
                                            </div>
                                        </div>
                                        <div className="col-lg-9 col-md-7 col-sm-12">
                                            <div className="main">
                                                <div className="top-content">
                                                    <p className="resort-id">ID : <span>{resort._id}</span></p>
                                                    <div className="dropdown">
                                                        <button className="dropdown-toggle" href="#" role="button" id="resortDropdown"
                                                            data-toggle="dropdown" aria-expanded="false">
                                                            • • • 
                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="resortDropdown">
                                                            <li><Link className="dropdown-item" to={`/admin/resort/${resort._id}/edit`}>Edit</Link></li>
                                                            <li><hr className="dropdown-divider"/></li>
                                                            <li><Link className="dropdown-item" onClick={() => handleShow(resort._id)}>Delete</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="body-content">
                                                    <div className="top">
                                                        <h3 className="fweight-600">{resort.name}</h3>
                                                        <div className="ratings">
                                                        {resort.phone}
                                                        </div>
                                                    </div>
                                                    <p className="location fweight-500">{`${resort.address}, ${resort.city}, ${resort.province}, Philippines ${resort.zip_code}`}</p>
                                                    <p>{resort.description}</p>
                                                </div>
                                                <hr/>
                                                <div className="bottom-content">
                                                    <div className="row">
                                                        <div className="col-md-4 price-cont">
                                                            <p className="price fweight-600">P{resort.price_per_night} / night</p>
                                                        </div>
                                                        <div className="col-md-8 amenities">
                                                            <p>{
                                                                    Object.entries(resort.amenities).map(
                                                                    ([key, value], index, arr) => {
                                                                        return (value && index === arr.length-1) ? <span>{key}</span> : value ? <span>{`${key}, `}</span> : null;
                                                                    })
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
)}


export default ResortListAdminScreen
