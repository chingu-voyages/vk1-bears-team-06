import React from 'react'
import { Link } from 'react-router-dom'
import  emailSent from '../assets/images/svg/email-sent.svg'
import MetaDecorator from '../components/MetaDecorator' 
import sentEmailMeta from '../data/sentEmail'

const SentEmailScreen = ({ match }) => {
    const email = match.params.email 
    return (
        <>
        <MetaDecorator 
           title={sentEmailMeta.pageTitle} 
           description={sentEmailMeta.pageDescription} 
           keywords={sentEmailMeta.pageKeyword}
        />   
        <div className="confirmation">
            <div className="overlay-img"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-xs-12 join">
                        <div className="confirm-email">
                            <img src={emailSent} alt="mail" />
                            <h2>Verify Your Email Address</h2>
                            <p>We have sent you a link to the email below. Click the link to confirm your account. If you can't find the email, check your spam folder.</p>
                            <Link to="/" className="user-email">{email}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SentEmailScreen
