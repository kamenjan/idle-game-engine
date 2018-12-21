import React, { Component } from 'react'
import './App.css'

import { Route, Switch } from 'react-router-dom';

import DevelopmentInterface from './components/DevelopmentInterface'
import LoginContainer from './containers/LoginContainer'
import Home from './components/Home'
import Menu from './components/Menu'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    return (
      <div className="App">
        <DevelopmentInterface />
        <Menu />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={LoginContainer} />
        </Switch>
      </div>
    )
  }
}

export default App
