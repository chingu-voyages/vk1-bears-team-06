import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { activateUser } from '../actions/userActions'
import jwt from 'jsonwebtoken';

const ActivateAccountScreen = ({ match, history, location }) => {
    const [values, setValues] = useState({ name: '', token: '' })
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userActivate = useSelector(state => state.userActivate)
    const { loading, error, userInfo } = userActivate 

    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }

        let token = match.params.token
        let { name } = jwt.decode(token)
        if (token) {
            setValues({ ...values, name, token })
        }

    }, [match, values, history, userInfo, redirect])

    const { name, token } = values

    const submitHandler = (e) => {
        e.preventDefault()
        if(token){
            dispatch(activateUser(token)) 
        } else {
            setMessage('Something went wrong!')
        }
    };
    return (
        <>
             <h1>Activate</h1>
            { message && <Message variant='danger'>{message} </Message>}
           { error && <Message variant='danger'>{error} </Message>}
           { loading && <Loader /> }
            <div className="col-md-6 offset-md-3">
            <h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
            <button className="btn btn-outline-primary" onClick={submitHandler}>
                Activate Account
            </button>
            </div>
        </>
    );
};

export default ActivateAccountScreen