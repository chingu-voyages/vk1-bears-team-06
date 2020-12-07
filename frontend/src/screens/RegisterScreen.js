import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister 

    const redirect = location.search ? location.search.split('=')[1] : '/'

     useEffect(() => {
         if(userInfo){
             history.push(redirect)
         }
     }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // DISPATCH REGISTER
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, phone, role, password))
        }
    }

    return ( 
        <>
            <h1>Sign Up</h1>
            { message && <Message variant='danger'>{message} </Message>}
           { error && <Message variant='danger'>{error} </Message>}
           { loading && <Loader /> }
            <form onSubmit={submitHandler}> 
            <div className="form-group"> 
                <label for="name">Name</label>
                <input type="text" name="name" className="form-control" id="name" placeholder="Enter name" onChange={(e) => setName(e.target.value)}  />
            </div>
            <div className="form-group"> 
                <label for="email">Email address</label>
                <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}  />
            </div>
            <div className="form-group"> 
                <label for="phone">Phone</label>
                <input type="text" pattern="[0-9]{9}" className="form-control" id="phone" placeholder="Enter phone" onChange={(e) => setPhone(e.target.value)}  />
            </div>
            <div className="form-group"> 
                <label for="phone">User Role</label>
                  <select class="form-control" onChange={(e) => setRole(e.target.value)}>
                     <option>I am a...</option>
                     <option value="resortOwner">Resort Owner</option>
                     <option value="reviewer">Reviewer</option>
                  </select>
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" className="form-control" id="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="form-group">
                <label for="confirmPassword">Password</label>
                <input type="password" name="confirmPassword" className="form-control" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p>have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login' }>Login</Link></p>
        </>
    )
}

export default RegisterScreen
