import React, { Component } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'

// NOTE: Server dependency [time, auth]
// import withServerSyncedTicker from './withServerSyncedTicker'
// import withAuth from './withAuth'

import Home from '../components/Home'
import Counter from '../components/Counter'
import ResponsiveDrawer from '../components/ResponsiveDrawer'

// NOTE: Server dependency [auth]
// import CircularProgress from '../components/CircularProgress'

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // NOTE: Server dependency [auth]
  // componentDidMount = async () => this.props.onIsLoggedIn()

  render() {
    // NOTE: Server dependency [auth]
    // const { loggedIn, inProgress } = this.props
    // if (inProgress) return <CircularProgress />
    // if (!loggedIn) return <Redirect to={'/login'} />

    return (
      <div className='App'>
        <ResponsiveDrawer>
          <Switch>
            <Route exact path='/' component={Counter} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/counter' component={Counter} />
          </Switch>
        </ResponsiveDrawer>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state.auth })

export default compose(
  // withServerSyncedTicker, // NOTE: Server dependency [time]
  // withAuth, // NOTE: Server dependency [auth]
  connect(
    mapStateToProps,
    null,
  ),
)(AppContainer)
