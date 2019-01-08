const initialState = {
  money: 0,
  energy: {
    base: 0, // base value used when saving and loading
    modifier: 0, // full number that is added every second
    currentValue: 0, // used in game loop for ui display, has to be calculated based on game loop interval speed
  },
  iron: {
    base: 0,
    modifier: 0,
    currentValue: 0,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_VALUE': // to be called by game loop interval
      return {
        state: state.map(resource => ({
          ...resource,
          // divide current value by 10 if re-render happens every 0.1 s
          currentValue: resource.currentValue + resource.modifier,
        })),
      }
    case 'UPDATE_MODIFIER': // gets called async by user
      return {
        state: state.map(resource => ({
          ...resource,
          modifier: resource.modifier + action.modifierDelta,
        })),
      }
    case 'SAVE': //
      return {
        state: state.map(resource => ({
          ...resource,
          base: resource.currentValue,
        })),
      }
    case 'LOAD': //
      return {
        state: state.map(resource => ({
          ...resource,
          currentValue:
            resource.base +
            // divide by 1000 to get difference in seconds:
            ((Date.now() - action.lastUpdate) / 1000) * resource.modifier,
        })),
      }
    case 'INCREMENT_MONEY':
      return {
        ...state,
        money: state.money + 1,
      }
    case 'DECREMENT_MONEY':
      return {
        ...state,
        money: state.money - 1,
      }
    default:
      return state
  }
}
