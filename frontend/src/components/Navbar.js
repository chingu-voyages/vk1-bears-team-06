import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import {ReactComponent as LogoNav} from '../assets/images/svg/logo-nav.svg';
import {ReactComponent as Menu} from '../assets/images/svg/menu.svg';
import {ReactComponent as UserIcon} from '../assets/images/svg/user.svg';

const Navbar = ({ match }) => {
const dispatch = useDispatch()

const userLogin = useSelector((state) => state.userLogin)
const { userInfo, logoutSuccess } = userLogin


useEffect(() => {
  if(logoutSuccess){
     store.addNotification({
         title: 'Success!',
         message: 'You are now logged out',
         type: 'success',                       
         container: 'top-right',               
         animationIn: ["animate__animated", "animate__fadeInRight"],   
         animationOut: ["animate__animated", "animate__fadeOutRight"],  
         dismiss: {
           duration: 4000
         }
       })
  }
}, [userInfo, logoutSuccess])


const logoutHandler = () => {
  dispatch(logout())
}
    return (
<>
<div id="nav-bar">
        <div id="main-nav-bar">
            <div className="nav-divider on-the-left">
                <div id="hamburger-icon" className="hamburger-icon hvr-sweep-to-top">
                    <div className="hamburger">
                      <Menu />
                    </div>
                </div>
                <div className="divider-line"></div>
                <Link className="navlinks" to='/'>
                    <div className="nav-item write-review-link hvr-sweep-to-top">
                        Write Review
                    </div>
                </Link>
                <div className="divider-line"></div>
            </div>
            <div className="nav-divider on-the-right">

                { userInfo ? (
                    <>
                    
                    <div className="divider-line"></div>
                    <div className="dropdown">
                        <div className="nav-item account-link hvr-sweep-to-top dropdown-toggle" href="#" role="button" id="navbarDropdownAdmin" data-toggle="dropdown" aria-expanded="false">
                            <UserIcon />
                            <p>My Account</p> 
                        </div>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownAdmin">

                                { userInfo && userInfo.role === 'administrator' && (
                                    <>
                                    <li><Link className="dropdown-item" to='/admin/userslist'>Users</Link></li>
                                    <li><Link className="dropdown-item" to='/admin/resortslist'>Resorts</Link></li>
                                    </>
                                    )
                                }

                                { userInfo && userInfo.role === 'resortOwner' && (
                                    <>
                                    <li><Link className="dropdown-item" to={`/resort-owner/${userInfo._id}/resortslist`}>Resorts</Link></li>
                                    </>
                                    )
                                }

                                <li><Link className="dropdown-item" to='/profile'>Settings</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to='/' onClick={logoutHandler}>Logout</Link></li>
                            </ul>
                    </div>
                    </>
                    ) : (
                        <>
                        <div className="divider-line"></div>
                        <Link to="/login">
                            <div className="nav-item login-link hvr-sweep-to-top">Login</div>
                        </Link>
                        <div className="divider-line"></div>
                        <Link to="/register">
                            <div className="nav-item register-link hvr-sweep-to-top">Register</div>
                        </Link>
                        </>
                    )
                }
            </div>
            <Link to='/' className="main-logo">
              <LogoNav />
            </Link>
            <div className="bottom-line"></div>
        </div>

        <div id="mega-menu" className="mega-menu hidden">
            <div className="overlay-menu" id="overlay-menu">
                <nav>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <Link  className="navlinks" to='/'>Write A Review</Link>
                                <Link  className="navlinks" to='/about'>About Us</Link>
                                <Link  className="navlinks" to='/privacy-policy'>Privacy Policy</Link>
                                <Link  className="navlinks" to='/terms-and-conditions'>Terms and Conditions</Link>
                            </div>
                            <div className="col-sm-6">
                                <a className="navlinks" href="mailto: samuelnick.norton@gmail.com">Contact</a>
                                <Link className="navlinks" to='/'>Explore</Link>
                                { userInfo ? 
                                    (
                                        <Link  className="navlinks" to='/profile'>My Account</Link>
                                    ) :
                                    (
                                        <>
                                        <Link  className="navlinks" to='/login'>Login</Link>
                                        <Link  className="navlinks" to='/register'>Register</Link>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</>
)
}

export default Navbar