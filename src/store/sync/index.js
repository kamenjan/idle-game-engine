/* Action creators: */
export const sync = offset => dispatch => {
  return dispatch({
    type: 'SYNC',
    offset
  })
}

export const tick = offset => dispatch => {
  return dispatch({
    type: 'TICK',
    offset
  })
}

/* Reducers: */
const initState = {
  serverTime: 0,
  localTime: 0,
  synced: false,
  lastSync: 0, // relative to server time
  offset: 0
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'SYNC':
      return {
        ...state,
        offset: action.offset,
        lastSync: Date.now(),
        synced: true
      }
    case 'TICK':
      return {
        ...state,
        serverTime: Date.now() + action.offset,
        localTime: Date.now()
      }
    default:
      return state
  }
}