import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGOUT_PENDING,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED
} from '../constants/actionTypes'

const initialState = {
  inProgress: false,
  errors: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        inProgress: true,
      }
    case LOGIN_FULFILLED:

      // loggedin = action.payload.loggedin

      return {
        ...state,
        inProgress: false,
        loggedIn: true
      }
    case LOGIN_REJECTED:
      return {
        ...state,
        inProgress: false,
        error: action.payload
      }
    case LOGOUT_PENDING:
      return {
        ...state,
        inProgress: true
      }
    case LOGOUT_FULFILLED:
      return {
        ...state,
        loggedIn: false
      }
    case LOGOUT_REJECTED:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
