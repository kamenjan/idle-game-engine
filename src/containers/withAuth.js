import React from 'react'


import { connect } from 'react-redux'
import {
  LOGIN,
  LOGOUT
} from '../constants/actionTypes';

function withAuth (Component) {

  const login = async (mail, password) => {
    try {
      return await fetch(`/api/user/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password })
      })
    } catch (err) {
      return err
    }
  }

  const logout = async (e) => {
    e.preventDefault()
    try {
      return await fetch(`/api/user/logout`)
    } catch (err) {
      return err
    }
  }

  const mapStateToProps = state => ({ ...state.auth })

  const mapDispatchToProps = dispatch => ({
    onLogin: (mail, password) => {
      return dispatch({ type: LOGIN, payload: login(mail, password) })
    },
    onLogout: () => dispatch({ type: LOGOUT, payload: logout() }),
    dispatch
  })

  class Auth extends React.PureComponent {

    render() {
      return <Component
        login={this.login}
        logout={this.logout}
      />
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Auth)
}

export default withAuth