import {
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  UPDATE_FIELD_AUTH
} from '../constants/actionTypes';

const initialState = {
  username: '',
  password: '',
  length: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return {};
    case UPDATE_FIELD_AUTH:
      return {
        ...state,
        [action.key]: action.value,
        length: action.value.length
      }
    default:
      return state;
  }
}
