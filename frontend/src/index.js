import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import '../src/assets/css/account-user.css'
import '../src/assets/css/activate.css'
import '../src/assets/css/admin.css'
import '../src/assets/css/confirmation.css'
import '../src/assets/css/footer.css'
import '../src/assets/css/listing-page.css'
import '../src/assets/css/login.css'
import '../src/assets/css/navbar.css'
import '../src/assets/css/register.css'
import '../src/assets/css/single-resort.css'
import '../src/assets/css/style.css'
import '../src/assets/css/utilities.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

