import React from 'react'
import { create } from 'timesync/dist/timesync'
import { sleep } from '../utils/functional'

import { connect } from 'react-redux'

import { SYNC, TICK, START_TIMER, STOP_TIMER } from '../constants/actionTypes'

function withServerSyncedTicker (Component) {

  const mapDispatchToProps = dispatch => ({
    offsetUpdate: offset => dispatch({ type: SYNC, offset }),
    onTick: offset => dispatch({ type: TICK, offset }),
    onStartTimer: () => dispatch({ type: START_TIMER }),
    onStopTimer: () => dispatch({ type: STOP_TIMER })
  })

  class ServerSyncedTicker extends React.Component {
    constructor (props) {
      super(props)

      // Initialize time controller
      this.syncController =
        this.initializeSyncController(create, '/api/servertime/sync')

      // Define event handler for changes in client-server time offset.
      // Synchronization algorithm asks for current server time five times
      // with one second intervals between requests. It uses first response
      // to calculate offset for asap update to client. Then it waits for
      // all five, calculates their median value and sets that as the new
      // more accurate offset.
      this.syncController.on('change', async offset => {
        // Each time a change in the offset occurs, we check if internal server
        // synced clock already exists. If it does, we stop it and set a new one
        // that starts at full second according to synced time, hence 'await'.
        if (this.internalClock) {
          this.internalClock.stop()
          // this.props.onStopTimer()
        }
        // NOTE: I've disabled internal clock to track redux state
        // this.internalClock = await this.setInternalClock(offset, 1000).start()
        // Update the state so we know when and that clocks were synced.
        this.props.offsetUpdate(offset)
      })

      // Start syncing process asap
      this.syncController.sync()
    }

    initializeSyncController = (create, serverTimesyncUrl, interval) => {
      return create({
        server: serverTimesyncUrl,
        interval: interval ? interval : null
      })
    }

    startInternalClock = async (offset) => {
      // this.internalClock = await this.setInternalClock(offset, 1000).start()
    }

    // setInternalClock simulates setInterval, but includes self correcting
    // mechanism because native setInterval drifts. It does so by invoking
    // sequential setTimeout events while accounting for the drift in between
    // the calls.
    setInternalClock = (offset, interval) => {
      let expected, timeout

      this.start = async () => {
        // Wait for full second before starting the interval
        await sleep(this.timestampToNextRoundSecond(Date.now() + offset))
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
          this.props.onTick(offset)
          expected += interval
          timeout = setTimeout(step, Math.max(0, interval-drift))
        }
      }
      return this
    }

    timestampToNextRoundSecond = timestamp => {
      return Math.abs((Math.round(timestamp) % 1000) - 1000)
    }
    
    render() {
      return <Component { ...this.props }/>
    }
  }

  return connect(null, mapDispatchToProps)(ServerSyncedTicker)
}

export default withServerSyncedTicker