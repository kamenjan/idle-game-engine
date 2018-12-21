import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  UPDATE_FIELD_AUTH
} from '../constants/actionTypes'

const initialState = {
  username: '',
  password: '',
  inProgress: false,
  errors: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        loading: true
      }
    case LOGIN_FULFILLED:
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
    case UPDATE_FIELD_AUTH:
      return { ...state, [action.key]: action.value }
    default:
      return state
  }
}
