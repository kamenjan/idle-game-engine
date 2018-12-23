// example of store, but uses outdated react-router-redux package
// https://github.com/gothinkster/react-redux-realworld-example-app/blob/master/src/store.js

// Combine and import all reducers
import createRootReducer from './reducers'

import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { routerMiddleware } from 'connected-react-router'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

export const store = history => {
  return createStore(
    createRootReducer(history), // root reducer with router state
    composeWithDevTools( // use 'compose' in production
      applyMiddleware(
        routerMiddleware(history),
        promiseMiddleware(),
        thunk
      )
    )
  )
}