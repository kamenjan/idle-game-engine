import React from 'react'

import { connect } from 'react-redux'

// import { SYNC, TICK, START_TIMER, STOP_TIMER } from '../constants/actionTypes'

function withGameLoop(Component) {
  const mapDispatchToProps = dispatch => ({
    onTick: () => dispatch({ type: 'UPDATE_VALUE' }),
    onSave: () => dispatch({ type: 'SAVE' }),
  })

  class GameLoop extends React.Component {
    constructor(props) {
      super(props)
      if (this.internalClock) this.internalClock.stop()
      this.internalClock = this.setInternalClock(100).start()
    }

    // setInternalClock simulates setInterval, but includes self correcting
    // mechanism because native setInterval drifts. It does so by invoking
    // sequential setTimeout events while accounting for the drift in between
    // the calls.
    setInternalClock = interval => {
      let expected, timeout

      this.start = () => {
        expected = Date.now() + interval
        timeout = setTimeout(step, interval)
        return this
      }

      this.stop = () => clearTimeout(timeout)

      const step = () => {
        let drift = Date.now() - expected
        if (drift > interval) {
          this.stop()
        } else {
          // do my stuff ...
          console.log('this gets printed in game loop every 100ms')
          this.props.onTick()
          // do my stuff ...
          expected += interval
          timeout = setTimeout(step, Math.max(0, interval - drift))
        }
      }
      return this
    }

    render() {
      return <Component {...this.props} />
    }
  }

  return connect(
    null,
    mapDispatchToProps,
  )(GameLoop)
}

export default withGameLoop
