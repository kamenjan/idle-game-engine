/* Action creators: */

export const toggleCurrency = currency => dispatch => {
  dispatch({
    type: 'TOGGLE_CURRENCY',
    currency
  })
}

const initState = {
  currency: `USD`
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_CURRENCY':
      return {
        currency: action.currency
      }
    default:
      return state
  }
}

