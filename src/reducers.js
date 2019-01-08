// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from './reducers/auth'
import time from './reducers/time'
import loginForm from './reducers/loginForm'
import resources from './reducers/resources'

export default history =>
  combineReducers({
    time,
    auth,
    loginForm,
    resources,
    router: connectRouter(history),
  })
