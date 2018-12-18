import React from 'react'
import { create } from 'timesync/dist/timesync'
import { sleep } from '../utils/functional'
import moment from 'moment'

export default function withServerSyncedTicker(App) {
  return class extends React.Component {

    constructor () {
      super()

      // All this has to be in state so I can implement UI "admin" controller
      this.state = {
        serverTime: 0,
        localTime: 0,
        synced: false,
        lastSync: 0, // relative to server time
        offset: 0
      }

      // Initialize sync controller
      this.syncController = this.initializeSyncController(
        create, '/api/servertime/timesync'
      )

      this.syncController.on('change', async offset => {  // change in server/client time offset while syncing
        this.internalClock && this.internalClock.stop()
        this.internalClock = await this.setInternalClock(offset, 1000).start()
        this.setState(()=>({ lastSync: Date.now() + offset, synced: true, offset }))
      }).sync() // Start syncing process ASAP

    }

    initializeSyncController = (create, serverTimesyncUrl, interval) => {
      return create({
        server: serverTimesyncUrl,
        interval: interval ? interval : null
      })
    }

    setInternalClock (offset, interval) {
      let expected, timeout
      this.start = async () => {
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
          this.setState(()=>({
            serverTime: Date.now() + offset,
            localTime: Date.now()
          }))
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
      // Wraps the input component in a container, without mutating it. Good!
      return (
        <div>
          <div className={'debug-controller'} >
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>offset:</td>
                    <td>{this.state.offset}</td>
                  </tr>
                  <tr>
                    <td>local time:</td>
                    <td>{this.state.localTime}</td>
                    <td>{moment(this.state.localTime).format("hh:mm:ss")}</td>
                  </tr>
                  <tr>
                    <td>server time:</td>
                    <td>{this.state.serverTime}</td>
                    <td>{moment(this.state.serverTime).format("hh:mm:ss")}</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={this.syncController.sync} >Sync server time</button>
            </div>
          </div>
          <App {...this.state} {...this.props}/>
        </div>
      )
    }
  }
}