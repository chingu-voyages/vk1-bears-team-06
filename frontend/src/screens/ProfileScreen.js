import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
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
          <div className="col-lg-5">
          <h1>User Profile</h1>
            { message && <Message variant='danger'>{message} </Message>}
           { error && <Message variant='danger'>{error} </Message>}
           { loading && <Loader /> }
            <form onSubmit={handleSubmit(submitHandler)}> 
            <div className="form-group"> 
                <label for="name">Name</label>
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
                        { errors.name && errors.name.type ==='maxLength' && <p className="text-danger">Name is exceeds maximum length.</p> }
                    </div>
                    
            <div className="form-group"> 
                <label for="email">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            defaultValue={user.email}
                            placeholder="Enter email"
                            ref={register({ required: true, minLength: 8, maxLength: 30, pattern: /^\S+@\S+\.\S+$/ })}
                        />
                        { errors.email && errors.email.type ==='required' && <p className="text-danger">Email is required.</p> }
                        { errors.email && errors.email.type ==='minLength' && <p className="text-danger">Email length is too small.</p> }
                        { errors.email && errors.email.type ==='maxLength' && <p className="text-danger">Email exceeds maximum length.</p> }
                        { errors.email && errors.email.type ==='pattern' && <p className="text-danger">That is not a valid email.</p> }
                    </div>
                    
            <div className="form-group"> 
                <label for="phone">Phone</label>
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
                        { errors.phone && errors.phone.type ==='pattern' && <p className="text-danger">Phone is not a valid phone.</p> }
                    </div>
                    
            <div className="form-group"> 
                <label for="phone">User Role</label>
                 <h5>{ user.role }</h5> 
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            placeholder="Enter Password"
                            ref={register({ required: true, minLength: 6 })}
                        />
                        { errors.password && errors.password.type ==='required' && <p className="text-danger">Password is required.</p> }
                        { errors.password && errors.password.type === 'minLength' && <p className="text-danger">Password is too short.</p>}
            </div>
            <div className="form-group">
                <label for="confirmPassword">Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            ref={register({ required: true, minLength: 6 })}
                        />
                        { errors.confirmPassword && errors.confirmPassword.type ==='required' && <p className="text-danger">Password is required.</p> }
                        { errors.confirmPassword && errors.confirmPassword.type ==='minLength' && <p className="text-danger">Password is too short.</p> }
            </div>
<br/>
            <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
      </div>
   )
}

export default ProfileScreen
