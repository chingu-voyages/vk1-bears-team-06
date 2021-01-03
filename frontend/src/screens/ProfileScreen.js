import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = ({ history }) => {

    const { register, errors, handleSubmit }= useForm()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
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
           } else {
             setName(user.name)
             setEmail(user.email)
             setPhone(user.phone)
             setRole(user.role)
           }
         }
     }, [dispatch, history, userInfo, user])

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
           { success && <Message variant='success'>Profile Updated </Message>}
           { loading && <Loader /> }
            <form onSubmit={handleSubmit(submitHandler)}> 
            <div className="form-group"> 
                <label for="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name" value={name}
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
                            id="email" value={email}
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
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            id="phone" value={phone}
                            placeholder="Enter phone"
                            ref={register({ required: true, minLength: 10, maxLength: 13, pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/})}
                        />
                        { errors.phone && errors.phone.type ==='required' && <p className="text-danger">Phone is required.</p> }
                        { errors.phone && errors.phone.type ==='minLength' && <p className="text-danger">Phone length is too small.</p> }
                        { errors.phone && errors.phone.type ==='maxLength' && <p className="text-danger">Phone exceeds maximum length.</p> }
                        { errors.phone && errors.phone.type ==='pattern' && <p className="text-danger">Phone is not a valid phone.</p> }
                    </div>
                    
            <div className="form-group"> 
                <label for="phone">User Role</label>
                 <h5>{ role }</h5> 
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
