import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin 

    const redirect = location.search ? location.search.split('=')[1] : '/'

     useEffect(() => {
         if(userInfo){
             history.push(redirect)
         }
     }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // DISPATCH LOGIN
        dispatch(login(email, password))
    }

    return ( 
        <>
            <h1>Sign In</h1>
           { error && <Message variant='danger'>{error} </Message>}
           { loading && <Loader /> }
            <form onSubmit={submitHandler}> 
            <div className="form-group"> 
                <label for="email">Email address</label>
                <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}  />
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p>New User? <Link to={redirect ? `/register?redirect=${redirect}` : '/register' }>Register</Link></p>
        </>
    )
}

export default LoginScreen
