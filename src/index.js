import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';

import App from './App';
import withServerSyncedTicker from './containers/withServerSyncedTicker'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'

import sync from './store/sync'
// import settings from 'store/settings'

const store = createStore(
  combineReducers({
    // settings,
    sync
  }),
  applyMiddleware(
    thunk,
    promiseMiddleware(),
    /* dev redux logger */
    // createLogger()
  )
)

const AppWithServerSyncedTicker = withServerSyncedTicker(App)

ReactDOM.render((
  <Provider store={store}>
    <AppWithServerSyncedTicker />
  </Provider>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
