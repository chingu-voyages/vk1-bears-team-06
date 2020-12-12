import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'

import userIcon from '../assets/images/user.svg';

const Navbar = () => {
const dispatch = useDispatch()

const userLogin = useSelector((state) => state.userLogin)
const { userInfo } = userLogin

const logoutHandler = () => {
  dispatch(logout())
}
    return (
<>
<nav className="navbar navbar-expand-lg navbar-light bg-light" id="navigation">
  <div className="container">
    <Link className="navbar-brand" to='/'>IKO</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mr-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/resort">Resort Detail</Link>
        </li>
      </ul>

      <ul class="navbar-nav d-flex">
      { userInfo ? (

         <li className="nav-item dropdown">
         <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
            <img src={ userIcon } alt="User" />
            Dashboard
         </a>

         <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

            { userInfo.role === 'administrator' ? (
              <>
                <li> <Link className="dropdown-item" to='/admin/userslist'>Users</Link></li>
                <li> <Link className="dropdown-item" to='/admin/resortslist'>Resorts</Link></li>
              </>
            ):(
              <></>
            ) 
            }

            <li> <Link className="dropdown-item" to='/profile'>Profile</Link></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><Link className="dropdown-item" to='/' onClick={logoutHandler}>Logout</Link></li>
         </ul>
         </li>
         ) : (
         <>
         <li className="nav-item">
               <Link className="nav-link" to="/login">Login</Link> 
         </li> 
         <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link> 
         </li>
         </>
         )
      }
      </ul>
    </div>
  </div>
</nav>
</>
)
}

export default Navbar