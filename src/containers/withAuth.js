import React from 'react'

import { sleep } from '../utils/functional'

import { connect } from 'react-redux'
import {
  LOGIN,
  LOGOUT
} from '../constants/actionTypes';

function withAuth (Component) {

  const login = async (username, password) => {
    try {
      let response = await fetch(`/api/user/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      })

      return await response.json()

    } catch (err) {
      return err
    }
  }

  const isLoggedIn = async () => {
    try {
      let response = await fetch(`/api/user/login`)

      if (response.status === 200) {
        // return { loggedIn: true }
        return await response.json()
      }

      if (response.status === 401) { // Unauthorized
        return { loggedIn: false }
      }

    } catch (error) {
      return {
       error
      }
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
    onLogin: (username, password) => {
      return dispatch({ type: LOGIN, payload: login(username, password) })
    },
    onIsLoggedIn: () => dispatch({ type: LOGIN, payload: isLoggedIn() }),
    onLogout: () => dispatch({ type: LOGOUT, payload: logout() }),
    dispatch
  })

  class Auth extends React.PureComponent {
    render = () => <Component { ...this.props } />
  }

  return connect(mapStateToProps, mapDispatchToProps)(Auth)
}

export default withAuth