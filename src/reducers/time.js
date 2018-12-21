import { SYNC, TICK } from '../constants/actionTypes'

const initState = {
  serverTime: 0,
  localTime: 0,
  synced: false,
  lastSync: 0, // relative to server time
  offset: 0,
  tick: 0
}

export default (state = initState, action) => {
  switch (action.type) {
    case SYNC:
      return {
        ...state,
        offset: action.offset,
        lastSync: Date.now(),
        synced: true
      }
    case TICK:
      return {
        ...state,
        serverTime: Date.now() + action.offset,
        localTime: Date.now(),
        tick: 0
      }
    default:
      return state
  }
}

// TODO: time reducer according to new divided components
const reducerWIP = (state = initState, action) => {
  switch (action.type) {
    case SYNC:
      return {
        ...state,
        offset: action.offset,
        lastSync: Date.now(),
        synced: true
      }
    case TICK:
      return {
        ...state,
        serverTime: Date.now() + action.offset,
        localTime: Date.now(),
        tick: 0
      }
    default:
      return state
  }
}