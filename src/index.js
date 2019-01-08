import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from './serviceWorker'

import AppContainer from './containers/AppContainer'

// NOTE: Server dependency [auth]
// import LoginContainer from './containers/LoginContainer'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import { createBrowserHistory } from 'history'
import initializeStore from './store'

const history = createBrowserHistory()
const { store, persistor } = initializeStore(history)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path='/' component={AppContainer} />
          {/* NOTE: Server dependency [auth] */}
          {/*<Route path='/login' component={LoginContainer} />*/}
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
