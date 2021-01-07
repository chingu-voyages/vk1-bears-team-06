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
            { loading && <Loader /> }
            <div className="login">
                <div className="overlay-img"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-xs-12 join d-flex justify-content-center">
                        
                            <div className="join-form-container">
                                <div className="title">
                                    <h2>User Login</h2>
                                    <p className="fweight-500">Welcome back! Login to continue your access.</p>
                                </div>

                                { error && <Message variant='danger'>{error} </Message>}
                                
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <div className="mb-3 form-group">
                                        <label for="email" className="form-label fweight-600">Email Address</label>
                                        <input type="email" name="email" id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`}placeholder="example@email.com" ref={register({ required: true, minLength: 8, maxLength: 30, pattern: /^\S+@\S+\.\S+$/ })} />
                                        { errors.email && errors.email.type ==='required' && <p className="text-danger">Email is required.</p> }
                                        { errors.email && errors.email.type ==='minLength' && <p className="text-danger">Email length is too small.</p> }
                                        { errors.email && errors.email.type ==='maxLength' && <p className="text-danger">Email exceeds maximum length.</p> }
                                        { errors.email && errors.email.type ==='pattern' && <p className="text-danger">That is not a valid email.</p> }
                                    </div>
                                    <div className="mb-3 form-group">
                                        <label for="password" className="form-label fweight-600">Password</label>
                                        <input type="password" 
                                        name="password" 
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        id="password" 
                                        placeholder="Password" 
                                        ref={register({ required: true, minLength: 6 })} />
                                        { errors.password && errors.password.type ==='required' && <p className="text-danger">Password is required.</p> }
                                        { errors.password && errors.password.type ==='minLength' && <p className="text-danger">Password is too short.</p> }
                                    </div>
                                    <div className="d-grid submit">
                                        <button type="submit" class="btn btn-primary btn-block">LOGIN</button>
                                        <p>Don't have an account? <Link className="fweight-600" to='/register'>Register</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginScreen
