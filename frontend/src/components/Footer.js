import React from 'react'
import { Link } from 'react-router-dom'
import LogoFooter from '../assets/images/svg/logo-footer.svg';

const Footer = () => {
    return (
        <>
           <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 content copyright">
                            <p>Copyright @ 2020 <span className="fweight-700">IKO</span> by Bears Team 6</p>
                        </div>
                        <div className="col-lg-4 col-md-12 logo float-sm-start">
                            <img src={LogoFooter} alt="Logo" />
                        </div>
                        <div className="col-lg-4 col-md-12 socials content">
                            <Link className="fweight-600 link" to='/'>Facebook</Link> / 
                            <Link className="fweight-600 link" to='/'>Instagram</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer