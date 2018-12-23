import React, { Component } from 'react'
import './App.css'

import { Route, Switch } from 'react-router-dom';

import LoginContainer from './containers/LoginContainer'
import Home from './components/Home'
import ResponsiveDrawer from './components/ResponsiveDrawer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <ResponsiveDrawer>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/jadidai" component={LoginContainer} />
          </Switch>
        </ResponsiveDrawer>
      </div>
    )
  }
}

export default App