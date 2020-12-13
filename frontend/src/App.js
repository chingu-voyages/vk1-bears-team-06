import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ResortDetail from './screens/ResortDetail'
import LoginScreen from './screens/LoginScreen'
import Header from './components/Header'
import Footer from './components/Footer'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ResortListScreen from './screens/ResortListScreen'
import ResortEditScreen from './screens/ResortEditScreen'

const App = () => {
  return (
    <Router>  
       <Header />
          <div className="container">
             <Route path='/login' component={LoginScreen} exact />
             <Route path='/register' component={RegisterScreen} exact />
             <Route path='/profile' component={ProfileScreen} exact />
             <Route path='/admin/userslist' component={UserListScreen} exact />
             <Route path='/admin/resortslist' component={ResortListScreen} exact />
             <Route path='/admin/resort/:id/edit' component={ResortEditScreen} exact />
             <Route path='/admin/user/:id/edit' component={UserEditScreen} exact />
             <Route path='/' component={HomeScreen} exact />
             <Route path='/resorts/:id' component={ResortDetail} />
          </div>
       <Footer />
    </Router>
  )
}

export default App