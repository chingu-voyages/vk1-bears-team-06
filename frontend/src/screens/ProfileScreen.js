import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import HeaderBreadcrumb from '../components/HeaderBreadcrumb'
import SidebarSettings from '../components/SidebarSettings'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = ({ history }) => {

    const { register, errors, handleSubmit } = useForm()
    
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails 

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin 

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile 


     useEffect(() => {
         if(!userInfo){
             history.push('/login')
         } else {
           if(!user.name){
              dispatch(getUserDetails('profile'))
           } 
         }
         if(success){
            store.addNotification({
                title: 'Success!',
                message: 'Profile successfully updated.',
                type: 'success',                       
                container: 'top-right',               
                animationIn: ["animate__animated", "animate__fadeInRight"],   
                animationOut: ["animate__animated", "animate__fadeOutRight"],  
                dismiss: {
                  duration: 4000
                }
              })
         }
     }, [dispatch, history, userInfo, user, success])

    const submitHandler = (data, e) => {
        e.preventDefault()
        const {name, email, phone, password, confirmPassword } = data
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else {
           dispatch(updateUserProfile( { id: user._id, name, email, phone, password }))
        }
    }

    return ( 
        <div className="row">
            { message && <Message variant='danger'>{message} </Message>}
            { error && <Message variant='danger'>{error} </Message>}
            { loading && <Loader /> }
            <HeaderBreadcrumb subtitle ="Account Settings" title="My Account" />

            <div className="account-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 sidebar">
                            <SidebarSettings />
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="content">
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <div className="inner-form">
                                    <div className="mb-3 row form-group"> 
                                        <label for="name" className="col-lg-3 col-md-12 col-form-label fweight-600">Full Name<span>*</span></label>
                                            <div className="col-lg-9 col-sm-12">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                    id="name"
                                                    defaultValue={user.name}
                                                    placeholder="Enter name"
                                                    ref={register({ required: true, minLength: 2, maxLength: 30 })}
                                                />
                                                { errors.name && errors.name.type ==='required' && <p className="text-danger">Name is required.</p> }
                                                { errors.name && errors.name.type ==='minLength' && <p className="text-danger">Name is too short.</p> }
                                                {errors.name && errors.name.type === 'maxLength' && <p className="text-danger">Name is exceeds maximum length.</p>}
                                            </div>
                                    </div>
                                    
                                    <div className="mb-3 row form-group"> 
                                            <label for="email" className="col-lg-3 col-md-12 col-form-label fweight-600">Email address</label>
                                            <div className="col-lg-9 col-sm-12">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control non-editable"
                                                    id="email"
                                                    defaultValue={user.email}
                                                    readOnly
                                                />
                                                {/* { errors.email && errors.email.type ==='required' && <p className="text-danger">Email is required.</p> }
                                                { errors.email && errors.email.type ==='minLength' && <p className="text-danger">Email length is too small.</p> }
                                                { errors.email && errors.email.type ==='maxLength' && <p className="text-danger">Email exceeds maximum length.</p> }
                                                {errors.email && errors.email.type === 'pattern' && <p className="text-danger">That is not a valid email.</p>} */}
                                            </div>
                                    </div>
                                    
                                    <div className="mb-3 row form-group"> 
                                            <label for="phone" className="col-lg-3 col-md-12 col-form-label fweight-600">Phone</label>
                                                <div className="col-lg-9 col-sm-12">
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                                        id="phone"
                                                        defaultValue={user.phone}
                                                        placeholder="Enter phone"
                                                        ref={register({ required: true, minLength: 10, maxLength: 18, pattern: /(^0|[89]\d{2}-\d{3}\-?\d{4}$)|(^0|[89]\d{2}\d{3}\d{4}$)|(^63[89]\d{2}-\d{3}-\d{4}$)|(^63[89]\d{2}\d{3}\d{4}$)|(^[+]63[89]\d{2}\d{3}\d{4}$)|(^[+]63[89]\d{2}-\d{3}-\d{4}$)|(^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$)/})}
                                                    />
                                                    { errors.phone && errors.phone.type ==='required' && <p className="text-danger">Phone is required.</p> }
                                                    { errors.phone && errors.phone.type ==='minLength' && <p className="text-danger">Phone length is too small.</p> }
                                                    { errors.phone && errors.phone.type ==='maxLength' && <p className="text-danger">Phone exceeds maximum length.</p> }
                                                    {errors.phone && errors.phone.type === 'pattern' && <p className="text-danger">Phone is not a valid phone.</p>}
                                                </div>
                                    </div>
                                    
                                    <div className="mb-3 row form-group"> 
                                        <label for="role" className="col-lg-3 col-md-12 col-form-label fweight-600">Account Type</label>
                                            <div className="col-lg-9 col-sm-12">
                                                <input type="text" id="role" defaultValue={user.role} className="form-control-plaintext" readOnly />
                                            </div>
                                    </div>
                                    
                                    <div className="mb-3 row form-group">
                                            <label for="password" className="col-lg-3 col-md-12 col-form-label fweight-600">Password</label>
                                            <div className="col-lg-9 col-sm-12">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                    id="password"
                                                    placeholder="Enter Password"
                                                    ref={register({ required: true, minLength: 6 })}
                                                />
                                                { errors.password && errors.password.type ==='required' && <p className="text-danger">Password is required.</p> }
                                                {errors.password && errors.password.type === 'minLength' && <p className="text-danger">Password is too short.</p>}
                                            </div>
                                    </div>
                                    
                                    <div className="mb-1 row form-group">
                                            <label for="confirmPassword" className="col-lg-3 col-md-12 col-form-label fweight-600">Repeat Password</label>
                                            <div className="col-lg-9 col-sm-12">
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                    id="confirmPassword"
                                                    placeholder="Confirm Password"
                                                    ref={register({ required: true, minLength: 6 })}
                                                />
                                                { errors.confirmPassword && errors.confirmPassword.type ==='required' && <p className="text-danger">Password is required.</p> }
                                                {errors.confirmPassword && errors.confirmPassword.type === 'minLength' && <p className="text-danger">Password is too short.</p>}
                                            </div>
                                    </div>
                                    </div>
                                    <br/>
                                    <div className="mb-5 d-grid submit">
                                        <button type="submit" className="btn btn-block">SAVE CHANGES</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12">
                            <div className="side-ad">
                                <p>Cake or pie? I can tell a lot about you by which one you pick. It may seem silly, but cake
                                    people and pie people are really different. I know which one I hope you are, but that's not
                                    for me to decide. So, what is it? Cake or pie?</p>
                                <ul>
                                    <li>Cake or pie? I can tell a lot about</li>
                                    <li>I know which one I hope</li>
                                    <li>It may seem silly</li>
                                </ul>
                                <div className="d-grid submit">
                                    <Link to="/" className="btn btn-block">WRITE A REVIEW</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   )
}

export default ProfileScreen
