import React from 'react'
import { Link } from 'react-router-dom'
import  notFoundImage from '../assets/images/svg/404.svg'

const NotFoundScreen = () => {
    return (
        <>
           <div className="confirmation activate">
        <div className="overlay-img"></div>
        <div className="container">
            <div className="row">

                <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-xs-12 join">
                    <div className="confirm-email">
                        <img src={notFoundImage} alt="404 Page not found" />
                        <h2>Ooops!</h2>
                        <p>Looks like you got lost. Let's get you ...</p>
                        <Link to='/'  className="btn">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}

export default NotFoundScreen
