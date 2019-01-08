import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGOUT_PENDING,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED,
} from '../constants/actionTypes'

const initialState = {
  loggedIn: false,
  inProgress: true,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        inProgress: true,
      }
    case LOGIN_FULFILLED:
      return {
        ...state,
        inProgress: false,
        loggedIn: action.payload.loggedIn,
      }
    case LOGIN_REJECTED:
      return {
        ...state,
        inProgress: false,
        error: action.payload,
      }
    case LOGOUT_PENDING:
      return {
        ...state,
        inProgress: true,
      }
    case LOGOUT_FULFILLED:
      return {
        ...state,
        loggedIn: false,
      }
    case LOGOUT_REJECTED:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
