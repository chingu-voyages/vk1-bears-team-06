import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { registerUser } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {

    const { register, errors, handleSubmit } = useForm()
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, success } = userRegister 

    const redirect = location.search ? location.search.split('=')[1] : '/'

     useEffect(() => {
         if(success){
             history.push(`/confirm-email/email=${email}`)
         }
     }, [history, success, redirect, email])

    const submitHandler = (data, e) => {
        e.preventDefault()
        const { name, email, phone, role, password, confirmPassword } = data

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else {
            dispatch(registerUser(name, email, phone, role, password))
        }
    }

    return ( 
        <>
            <h1>Sign Up</h1>
            { message && <Message variant='danger'>{message} </Message>}
            { error && <Message variant='danger'>{error} </Message>}
            { loading && <Loader /> }
            <form onSubmit={handleSubmit(submitHandler)} > 
            <div className="form-group"> 
                <label for="name">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="name" 
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
                   placeholder="Enter email" 
                   onChange={(e) => setEmail(e.target.value)}
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
                   id="phone" 
                   name="phone"
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
                <div class="role">
                <input 
                   type="radio" 
                   className="btn-check" 
                   name="role" 
                   id="resort-owner" 
                   autocomplete="off"  
                   value='resortOwner'
                   ref={register({ required: true })}
                    />
                <label className="btn btn-outline-success" for="resort-owner">Resort Owner</label>
                <input 
                   type="radio" 
                   className="btn-check"
                   name="role" 
                   id="reviewer" 
                   autocomplete="off" 
                   value='reviewer'
                   ref={register({ required: true })}
                />
                <label className="btn btn-outline-success" for="reviewer">Reviewer</label>
                { errors.role && errors.role.type ==='required' && <p className="text-danger">Choose a role.</p> }
             </div>

            </div>

            <div className="form-group">
                <label for="password">Password</label>
                <input 
                   type="password" 
                   name="password" 
                   className="form-control" 
                   id="password" 
                   placeholder="Enter Password" 
                   ref={register({ required: true, minLength: 6 })}
                />
                  { errors.password && errors.password.type ==='required' && <p className="text-danger">Password is required.</p> }
                 { errors.password && errors.password.type ==='minLength' && <p className="text-danger">Password is too short.</p> }
            </div>

            <div className="form-group">
                <label for="confirmPassword">Password</label>
                <input 
                   type="password" 
                   name="confirmPassword" 
                   className="form-control" 
                   id="confirmPassword" 
                   placeholder="Confirm Password" 
                   ref={register({ required: true, minLength: 6 })}
                />
                  { errors.confirmPassword && errors.confirmPassword.type ==='required' && <p className="text-danger">Password is required.</p> }
                 { errors.confirmPassword && errors.confirmPassword.type ==='minLength' && <p className="text-danger">Password is too short.</p> }
            </div>

            <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p>have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login' }>Login</Link></p>
        </>
    )
}

export default RegisterScreen
