import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ ...state.resources })

class Counter extends React.Component {
  increment = () => {
    this.props.dispatch({ type: 'INCREMENT_MONEY' })
  }

  decrement = () => {
    this.props.dispatch({ type: 'DECREMENT_MONEY' })
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.props.money}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Counter)
