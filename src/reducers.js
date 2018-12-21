// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from "./reducers/auth"
import time from "./reducers/time"

export default (history) => combineReducers({
  time,
  auth,
  router: connectRouter(history)
})