import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = ({ history }) => {
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

    const submitHandler = (e) => {
        e.preventDefault()
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
            <form onSubmit={submitHandler}> 
            <div className="form-group"> 
                <label for="name">Name</label>
                <input type="text" name="name" className="form-control" id="name" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)}  />
            </div>
            <div className="form-group"> 
                <label for="email">Email address</label>
                <input type="email" name="email" className="form-control" id="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}  />
            </div>
            <div className="form-group"> 
                <label for="phone">Phone</label>
                <input type="text" className="form-control" id="phone" value={phone} placeholder="Enter phone" onChange={(e) => setPhone(e.target.value)}  />
            </div>
            <div className="form-group"> 
                <label for="phone">User Role</label>
                 <h5>{ role }</h5> 
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" className="form-control" id="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="form-group">
                <label for="confirmPassword">Password</label>
                <input type="password" name="confirmPassword" className="form-control" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
<br/>
            <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
      </div>
   )
}

export default ProfileScreen
