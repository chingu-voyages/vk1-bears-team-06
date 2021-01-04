import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {

    const { register, errors, handleSubmit } = useForm()

    const userId = match.params.id

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails 

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate 

     useEffect(() => {
       if(successUpdate){
           dispatch({ type: USER_UPDATE_RESET })
           history.push('/admin/userslist')
           store.addNotification({
            title: 'Success!',
            message: 'User successfully updated.',
            type: 'success',                       
            container: 'top-right',               
            animationIn: ["animate__animated", "animate__fadeInRight"],   
            animationOut: ["animate__animated", "animate__fadeOutRight"],  
            dismiss: {
              duration: 4000
            }
          })
       } 
       
       if(!user.name || user._id !== userId){
        dispatch(getUserDetails(userId))
       }
     
     }, [dispatch, history, userId, user, successUpdate])

    const submitHandler = (data, e) => {
        e.preventDefault()
        const {name, email, phone, role } = data
        dispatch(updateUser({ _id: userId, name, email, phone, role  }))
    }

    return ( 
        <>
            <h1>Edit User</h1>
            { loadingUpdate && <Loader /> }
    { errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <form onSubmit={handleSubmit(submitHandler)}> 
            <div className="form-group"> 
                <label for="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user.name}
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name"
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
                            defaultValue={user.email}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
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
                            defaultValue={user.phone}
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            id="phone"
                            ref={register({ required: true, minLength: 10, maxLength: 13, pattern: /(^0|[89]\d{2}-\d{3}\-?\d{4}$)|(^0|[89]\d{2}\d{3}\d{4}$)|(^63[89]\d{2}-\d{3}-\d{4}$)|(^63[89]\d{2}\d{3}\d{4}$)|(^[+]63[89]\d{2}\d{3}\d{4}$)|(^[+]63[89]\d{2}-\d{3}-\d{4}$)|(^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$)/  })}
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
                   id="administrator" 
                   autocomplete="off"  
                   value='administrator'
                   defaultChecked={user.role === 'administrator'}
                   ref={register({ required: true })}
               
                    />
                <label className="btn btn-outline-success" for="administrator">Administrator</label>
                <input 
                   type="radio" 
                   className="btn-check" 
                   name="role" 
                   id="resort-owner" 
                   autocomplete="off"  
                   value='resortOwner'
                   defaultChecked={user.role === 'resortOwner'}
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
                   defaultChecked={user.role === 'reviewer'}
                    ref={register({ required: true })}
                    
                />
                <label className="btn btn-outline-success" for="reviewer">Reviewer</label>
                { errors.role && errors.role.type ==='required' && <p className="text-danger">Choose a role.</p> }
             </div>

            </div>
        
            <button type="submit" className="btn btn-primary">Update</button>
            </form>
            
    )}

        </>
    )
}

export default UserEditScreen
