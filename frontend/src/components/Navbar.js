import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

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
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to='/'>Iko</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/resort">Resort Detail</Link>
        </li>

        { userInfo ? (

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
            { userInfo.name }
          </a>

        
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
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

{ userInfo && userInfo.role === 'administrator' && (
          <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownAdmin" role="button" data-toggle="dropdown" aria-expanded="false">
            Administrator
          </a>

        
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li> <Link className="dropdown-item" to='/admin/userslist'>Users</Link></li>
            <li> <Link className="dropdown-item" to='/admin/resortslist'>Resorts</Link></li>
          </ul>
        </li>
)}


{ userInfo && userInfo.role === 'resortOwner' && (
          <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownAdmin" role="button" data-toggle="dropdown" aria-expanded="false">
            Resort Owner
          </a>

        
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li> <Link className="dropdown-item" to={`/resort-owner/${userInfo._id}/resortslist`}>Resorts</Link></li>
          </ul>
        </li>
)}

      </ul>

    </div>
  </div>
</nav>
</>
)
}

export default Navbar