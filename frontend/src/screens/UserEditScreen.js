import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import SidebarSettings from '../components/SidebarSettings'
import HeaderBreadcrumb from '../components/HeaderBreadcrumb'
import MetaDecorator from '../components/MetaDecorator' 
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import '../assets/css/admin.css'
import userEditMeta from '../data/userEdit'


const UserEditScreen = ({ match, history }) => {

    const { register, errors, handleSubmit } = useForm()

    const userId = match.params.id

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails 

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate 

     useEffect(() => {
       if(successUpdate){
           dispatch({ type: USER_UPDATE_RESET })
           history.push('/admin/userslist')
           store.addNotification({
            title: 'Success!',
            message: 'User successfully updated.',
            type: 'success',                       
            container: 'top-right',               
            animationIn: ["animate__animated", "animate__fadeInRight"],   
            animationOut: ["animate__animated", "animate__fadeOutRight"],  
            dismiss: {
              duration: 4000
            }
          })
       } 
       
       if(!user.name || user._id !== userId){
        dispatch(getUserDetails(userId))
       }
     
     }, [dispatch, history, userId, user, successUpdate])

    const submitHandler = (data, e) => {
        e.preventDefault()
        const {name, email, phone, role } = data
        dispatch(updateUser({ _id: userId, name, email, phone, role  }))
    }

    return ( 
        <>
           <MetaDecorator 
              title={`Edit User | ${user.name}`} 
              description={userEditMeta.pageDescription} 
              keywords={user.name}
         />   
            <HeaderBreadcrumb title="Edit User" subtitle="Administrator" />
            { loadingUpdate && <Loader /> }
            { errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            
            <div className="admin account-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 sidebar">
                            <SidebarSettings />
                        </div>
                            
                <div className="col-lg-9 col-md-12">
                    <div className="content">
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="mb-3 row form-group"> 
                                <label for="name" className="col-lg-2 col-md-12 col-form-label fweight-600">Your Full Name</label>
                                    <div className="col-lg-10 col-sm-12">
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={user.name}
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            id="name"
                                            ref={register({ required: true, minLength: 2, maxLength: 30 })}
                                        />
                                        { errors.name && errors.name.type ==='required' && <p className="text-danger">Name is required.</p> }
                                        { errors.name && errors.name.type ==='minLength' && <p className="text-danger">Name is too short.</p> }
                                        { errors.name && errors.name.type ==='maxLength' && <p className="text-danger">Name is exceeds maximum length.</p> }
                                    </div>
                            </div>
                            
                            <div className="mb-3 row form-group"> 
                                <label for="email" className="col-lg-2 col-md-12 col-form-label fweight-600">Email address</label>
                                    <div className="col-lg-10 col-sm-12">
                                        <input
                                            type="email"
                                            name="email"
                                            defaultValue={user.email}
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            id="email"
                                            ref={register({ required: true, minLength: 8, maxLength: 30, pattern: /^\S+@\S+\.\S+$/ })}
                                        />
                                        { errors.email && errors.email.type ==='required' && <p className="text-danger">Email is required.</p> }
                                        { errors.email && errors.email.type ==='minLength' && <p className="text-danger">Email length is too small.</p> }
                                        { errors.email && errors.email.type ==='maxLength' && <p className="text-danger">Email exceeds maximum length.</p> }
                                        { errors.email && errors.email.type ==='pattern' && <p className="text-danger">That is not a valid email.</p> }
                            
                                    </div>
                            </div>
                            
                            <div className="mb-3 row form-group"> 
                                <label for="phone" className="col-lg-2 col-md-12 col-form-label fweight-600">Phone</label>
                                    <div className="col-lg-10 col-sm-12">
                                        <input
                                            type="text"
                                            name="phone"
                                            defaultValue={user.phone}
                                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                            id="phone"
                                            ref={register({ required: true, minLength: 10, maxLength: 13, pattern: /(^0|[89]\d{2}-\d{3}\-?\d{4}$)|(^0|[89]\d{2}\d{3}\d{4}$)|(^63[89]\d{2}-\d{3}-\d{4}$)|(^63[89]\d{2}\d{3}\d{4}$)|(^[+]63[89]\d{2}\d{3}\d{4}$)|(^[+]63[89]\d{2}-\d{3}-\d{4}$)|(^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$)/  })}
                                        />
                                        { errors.phone && errors.phone.type ==='required' && <p className="text-danger">Phone is required.</p> }
                                        { errors.phone && errors.phone.type ==='minLength' && <p className="text-danger">Phone length is too small.</p> }
                                        { errors.phone && errors.phone.type ==='maxLength' && <p className="text-danger">Phone exceeds maximum length.</p> }
                                        { errors.phone && errors.phone.type ==='pattern' && <p className="text-danger">Phone is not a valid phone.</p> }
                                    </div>
                            </div>
                            
                            <div className="mb-3 row form-group"> 
                                <label for="phone" className="col-lg-2 col-md-12 col-form-label fweight-600">Account Type</label>
                                <div class="col-lg-10 col-sm-12">
                                    <div class="role">
                                        <input 
                                            type="radio" 
                                            className="btn-check" 
                                            name="role" 
                                            id="administrator" 
                                            autocomplete="off"  
                                            value='administrator'
                                            defaultChecked={user.role === 'administrator'}
                                            ref={register({ required: true })}
                                            />
                                            <label className="btn btn-outline-success mb-2 mr-2" for="administrator">Administrator</label>
                                            
                                        <input 
                                            type="radio" 
                                            className="btn-check" 
                                            name="role" 
                                            id="resort-owner" 
                                            autocomplete="off"  
                                            value='resortOwner'
                                            defaultChecked={user.role === 'resortOwner'}
                                            ref={register({ required: true })}
                                            />
                                            <label className="btn btn-outline-success mb-2 mr-2" for="resort-owner">Resort Owner</label>
                                            
                                        <input 
                                            type="radio" 
                                            className="btn-check"
                                            name="role" 
                                            id="reviewer" 
                                            autocomplete="off" 
                                            value='reviewer'
                                            defaultChecked={user.role === 'reviewer'}
                                            ref={register({ required: true })}
                                            />
                                            <label className="btn btn-outline-success mb-2 mr-2" for="reviewer">Reviewer</label>
                                            { errors.role && errors.role.type ==='required' && <p className="text-danger">Choose a role.</p> }
                                    </div>
                                </div>
                            </div>
                            
                            <div className="d-grid submit">
                                <button type="submit" className="btn btn-primary btn-block">Update User</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
            
    )}

        </>
    )
}

export default UserEditScreen
