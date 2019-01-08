import React from 'react'

import { Redirect } from 'react-router-dom'

import LoginPanel from '../components/LoginPanel'
import withAuth from './withAuth'

import { compose } from 'redux'
import { connect } from "react-redux"
import { UPDATE_FIELD_AUTH } from '../constants/actionTypes'

const mapStateToProps = state => ({ ...state.loginForm, ...state.auth })

const mapDispatchToProps = dispatch => ({
  dispatch,
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value })
})

class LoginContainer extends React.PureComponent {

  constructor(props) {
    super(props)
  }

  changeUsername = event => this.props.onChangeUsername(event.target.value)
  changePassword = event => this.props.onChangePassword(event.target.value)
  submitForm = (username, password) => event => {
    event.preventDefault()
    this.props.onLogin(username, password)
  }

  render() {

    const isLoggedIn = this.props.loggedIn
    let render

    if (isLoggedIn) {
      render = <Redirect to="/"/>
    } else {
      render = <LoginPanel
        { ...this.props }
        changeUsername={this.changeUsername}
        changePassword={this.changePassword}
        submitForm={this.submitForm}
      />
    }

    return(
      [render]
    )
  }
}

export default compose(
  withAuth,
  connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer)