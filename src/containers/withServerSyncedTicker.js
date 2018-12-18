import React from 'react'
import { create } from 'timesync/dist/timesync'
import selfAdjustingInterval from '../utils/selfAdjustingInterval'
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

      // this.tickDuration = 1000
      // this.currentTick = 0

      this.intervalController = null

      // Initialize sync controller
      this.syncController = this.initializeSyncController(
        create, '/api/servertime/timesync'
      ).on('change', offset => {  // change in server/client time offset while syncing
        this.setInternalClock(offset, 1000)
        this.setState(()=>({ lastSync: Date.now() + offset, synced: true, offset }))
      }).sync() // Start syncing process ASAP
    }

    /**
     * Wait for whole second and start interval/tick that saves server time to
     * local state
     *
     * @param {int} offset Server/client time delta
     *
     * @param {int} interval Interval expressed in milliseconds
     */
    setInternalClock = async (offset, interval) => {
      if (this.intervalController) this.intervalController.stop()
      sleep(this.timestampToNextRoundSecond(Date.now() + offset))
      this.intervalController = new selfAdjustingInterval(() => {
          this.setState(()=>({
            serverTime: Date.now() + offset,
            localTime: Date.now()
          }))
        }, interval, () => this.syncController.sync()
      )
      this.intervalController.start()
    }

    // create = timesyncLibraryFactoryFunction (https://www.npmjs.com/package/timesync)
    initializeSyncController = (create, serverTimesyncUrl, interval) => {
      return create({
        server: serverTimesyncUrl,
        interval: interval ? interval : null
      })
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