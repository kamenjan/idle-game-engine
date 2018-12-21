import React from 'react'

import LoginPanel from '../components/LoginPanel'

import { connect } from "react-redux"
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth })

const mapDispatchToProps = dispatch => ({
  dispatch,
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: {email, password} }),
  // dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED })
})

class LoginContainer extends React.PureComponent {

  constructor() {
    super()
  }

  login = async (username, password) => {
    try {
      let response = await fetch(`/api/user/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  logout = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch(`/api/user/logout`)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  changeUsername = event => this.props.onChangeUsername(event.target.value)
  changePassword = event => this.props.onChangePassword(event.target.value)
  submitForm = (username, password) => event => {
    event.preventDefault()
    this.props.dispatch({type: LOGIN, payload: this.login(username, password)})
  }

  render() {
    return(
      <LoginPanel
        { ...this.props }
        changeUsername={this.changeUsername}
        changePassword={this.changePassword}
        submitForm={this.submitForm}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)