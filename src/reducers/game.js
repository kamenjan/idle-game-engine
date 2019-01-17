const initState = {
  serverTime: 0,
  localTime: 0,
  synced: false,
  lastSync: 0, // relative to server time
  offset: 0,
  tick: 0,
  running: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'NEKI':
      return {
        ...state,
        offset: action.offset,
        lastSync: Date.now(),
        synced: true,
      }
    case 'NEKI_DRUCGA':
      return {
        ...state,
        serverTime: Date.now() + action.offset,
        localTime: Date.now(),
        tick: state.tick + 1,
      }
    default:
      return state
  }
}
