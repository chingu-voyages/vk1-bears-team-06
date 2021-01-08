import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ResortDetailScreen from './screens/ResortDetailScreen'
import LoginScreen from './screens/LoginScreen'
import Header from './components/Header'
import Footer from './components/Footer'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ResortListAdminScreen from './screens/ResortListAdminScreen'
import ResortListOwnerScreen from './screens/ResortListOwnerScreen'
import ResortEditAdminScreen from './screens/ResortEditAdminScreen'
import ResortEditOwnerScreen from './screens/ResortEditOwnerScreen'
import ResortCreateAdminScreen from './screens/ResortCreateAdminScreen'
import ResortCreateOwnerScreen from './screens/ResortCreateOwnerScreen'
import SearchResultScreen from './screens/SearchResultScreen'
import ActivateAccountScreen from './screens/ActivateAccountScreen'
import SentEmailScreen from './screens/SentEmailScreen'
import NotFoundScreen from './screens/NotFoundScreen'
import ReactNotifications from 'react-notifications-component'
import AboutUsScreen from './screens/AboutUsScreen'
import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen'
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen'

const App = () => {
  return (
    <Router>  
       <ReactNotifications />
       <Header />
          <>
             <Switch>
             <Route path='/login' component={LoginScreen} exact />
             <Route path='/register' component={RegisterScreen} exact />
             <Route path='/profile' component={ProfileScreen} exact />
             <Route path='/admin/userslist' component={UserListScreen} exact />
             
             <Route path='/admin/resortslist' component={ResortListAdminScreen} exact />
             <Route path='/admin/resortslist/page/:pageNumber' component={ResortListAdminScreen} exact />

             <Route path='/admin/resorts/create' component={ResortCreateAdminScreen} exact />
             <Route path='/admin/resort/:id/edit' component={ResortEditAdminScreen} exact />

             <Route path='/resort-owner/:userid/resortslist' component={ResortListOwnerScreen} exact />
             <Route path='/resort-owner/:userid/resortslist/page/:pageNumber' component={ResortListOwnerScreen} exact />

             <Route path='/resort-owner/:userid/resorts/create' component={ResortCreateOwnerScreen} exact />
             <Route path='/resort-owner/:userid/resort/:id/edit' component={ResortEditOwnerScreen} exact />

             <Route path='/admin/user/:id/edit' component={UserEditScreen} exact />
             
             <Route path='/' component={HomeScreen} exact />
             <Route path='/about' component={AboutUsScreen} exact />
             <Route path='/terms-and-conditions' component={TermsAndConditionsScreen} exact />
             <Route path='/privacy-policy' component={PrivacyPolicyScreen} exact />

             <Route path='/search/:keyword' component={SearchResultScreen} exact />
             <Route path='/search/:keyword/page/:pageNumber/count/:count' component={SearchResultScreen} exact />
             
             <Route path='/resorts/:id' component={ResortDetailScreen} />
             <Route path='/auth/activate/:token' component={ActivateAccountScreen} />
             <Route path='/confirm-email/email=:email' component={SentEmailScreen} />
             <Route path='*' component={NotFoundScreen} exact/>
             </Switch>
          </>
       <Footer />
    </Router>
  )
}

export default App

