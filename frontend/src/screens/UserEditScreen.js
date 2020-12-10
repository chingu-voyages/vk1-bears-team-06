import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails 

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate 

     useEffect(() => {

       if(successUpdate){
           dispatch({ type: USER_UPDATE_RESET })
           history.push('/admin/userslist')
       } else {
        if(!user.name || user._id !== userId){
            dispatch(getUserDetails(userId))
         } else {
             setName(user.name)
             setEmail(user.email)
             setPhone(user.phone)
             setRole(user.role)
         }
       }
     }, [dispatch, history, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, phone, role  }))
    }

    return ( 
        <>
            <h1>Edit User</h1>
            { loadingUpdate && <Loader /> }
    { errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <form onSubmit={submitHandler}> 
            <div className="form-group"> 
                <label for="name">Name</label>
                <input type="text" name="name" value={name} className="form-control" id="name" onChange={(e) => setName(e.target.value)}  />
            </div>
            <div className="form-group"> 
                <label for="email">Email address</label>
                <input type="email" name="email"  value={email} className="form-control" id="email" onChange={(e) => setEmail(e.target.value)}  />
            </div>
            <div className="form-group"> 
                <label for="phone">Phone</label>
                <input type="text" value={phone} className="form-control" id="phone" onChange={(e) => setPhone(e.target.value)}  />
            </div>
            <div className="form-group"> 
                <label for="phone">User Role</label>
                  <select class="form-control" onChange={(e) => setRole(e.target.value)}>
                     <option value="administrator" selected={role === 'administrator'} >Administrator</option>
                     <option value="resortOwner" selected={role === 'resortOwner'}>Resort Owner</option>
                     <option value="reviewer" selected={role === 'reviewer'}>Reviewer</option>
                  </select>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
            </form>
            
    )}

        </>
    )
}

export default UserEditScreen
