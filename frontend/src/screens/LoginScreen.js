import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {

    const { register, errors, handleSubmit } = useForm()

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo, success } = userLogin 

    const redirect = location.search ? location.search.split('=')[1] : '/'

     useEffect(() => {
         if(userInfo){
             history.push(redirect)
         }
         if(success){
            store.addNotification({
                title: 'Success!',
                message: 'You are now logged in',
                type: 'success',                       
                container: 'top-right',               
                animationIn: ["animate__animated", "animate__fadeInRight"],   
                animationOut: ["animate__animated", "animate__fadeOutRight"],  
                dismiss: {
                  duration: 4000
                }
              })
         }
     }, [history, userInfo, redirect, success])


    const submitHandler = (data, e) => {
        e.preventDefault()
        const { email, password } = data
        dispatch(login(email, password))
    }

    return ( 
        <>
            <h1>Sign In</h1>
           { error && <Message variant='danger'>{error} </Message>}
           { loading && <Loader /> }

         <form onSubmit={handleSubmit(submitHandler)}> 
            <div className="form-group"> 
                <label for="email">Email address</label>
                <input 
                  type="email" 
                  name="email" 
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email" 
                  placeholder="Enter email" 
                  ref={register({ required: true, minLength: 8, maxLength: 30, pattern: /^\S+@\S+\.\S+$/ })}
                />
                { errors.email && errors.email.type ==='required' && <p className="text-danger">Email is required.</p> }
                { errors.email && errors.email.type ==='minLength' && <p className="text-danger">Email length is too small.</p> }
                { errors.email && errors.email.type ==='maxLength' && <p className="text-danger">Email exceeds maximum length.</p> }
                { errors.email && errors.email.type ==='pattern' && <p className="text-danger">That is not a valid email.</p> }
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password" 
                  placeholder="Password" 
                  ref={register({ required: true, minLength: 6 })}
                 />
                 { errors.password && errors.password.type ==='required' && <p className="text-danger">Password is required.</p> }
                 { errors.password && errors.password.type ==='minLength' && <p className="text-danger">Password is too short.</p> }
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            </form>

            <p>New User? <Link to={redirect ? `/register?redirect=${redirect}` : '/register' }>Register</Link></p>
        </>
    )
}

export default LoginScreen
