import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import  activateAccount from '../assets/images/svg/activate_account.svg'
import { activateUser } from '../actions/userActions'
import jwt from 'jsonwebtoken';
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

const ActivateAccountScreen = ({ match, history, location }) => {
    const [values, setValues] = useState({ name: '', token: '' })
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userActivate = useSelector(state => state.userActivate)
    const { loading, error, userInfo, success } = userActivate 

    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }

        if(success){
            store.addNotification({
                title: 'Success!',
                message: 'Your account is now activated.',
                type: 'success',                       
                container: 'top-right',               
                animationIn: ["animate__animated", "animate__fadeInRight"],   
                animationOut: ["animate__animated", "animate__fadeOutRight"],  
                dismiss: {
                  duration: 4000
                }
              })
         }

        let token = match.params.token
        let { name } = jwt.decode(token)
        if (token) {
            setValues({ ...values, name, token })
        }

    }, [match, values, history, userInfo, redirect, success])

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
            <div className="confirmation activate">
            <div className="overlay-img"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-xs-12 join">
                        <div className="confirm-email">
                            <img src={activateAccount} alt="mail" />
                            <h2>You're almost there!</h2>
                            <p>Just one more step to get started. Click the button below.</p>
                            <button className="btn btn-activate" onClick={submitHandler}>Activate Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ActivateAccountScreen