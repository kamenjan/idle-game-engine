// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import resources from './reducers/resources'
import settings from './reducers/settings'

export default history =>
  combineReducers({
    resources,
    router: connectRouter(history),
  })
