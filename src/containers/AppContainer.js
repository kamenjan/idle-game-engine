import React, { Component } from 'react'

import { Route, Switch } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Home from '../components/Home'
import Counter from '../components/Counter'
import ResponsiveDrawer from '../components/ResponsiveDrawer'

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
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
  connect(
    mapStateToProps,
    null,
  ),
)(AppContainer)
