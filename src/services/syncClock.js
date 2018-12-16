import React, { Component } from 'react'

import moment from 'moment'

import { pipeAsync } from '../utils/functional'

import setSelfAdjustingInterval from '../utils/time'

export default function serverTime(App) {
  return class extends React.Component {

    constructor () {
      super()

      // All this has to be in state so I can implement UI "admin" controller
      this.state = {
        serverTime: 0,
        synced: false,
        lastSync: 0, // relative to server time
        latency: 0
      }

      this.tickDuration = 1000
      this.currentTick = 0
      this.requestCount = 5
    }

    componentDidMount () {
      // setTimeout(()=>{
      //   pipeAsync(
      //     this.getServerTime,
      //     this.setInternalClock
      //   )()
      // },200)
    }

    componentWillUnmount () {
      // clearInterval(this.interval)
    }

    getServerTime = async () => {
      console.log('request to server')
      try {
        let clientRequestTime = Date.now()
        let response = await fetch(`/api/servertime/sync`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clientRequestTime })
        })
        let { serverResponseTime } = await response.json()
        let latency = (Date.now() - clientRequestTime) / 2
        return { serverResponseTime, latency }
      } catch (err) {
        console.log(err)
        return err
      }
    }

    setInternalClock = ({serverResponseTime, latency}) => {
      // Calculate server time based on latency ...
      let serverTime = serverResponseTime + latency
      this.setState(()=>({
        latency,
        synced: true,
        lastSync: serverTime
      }))
      // ... and how many ms to full second
      let toFullSecond = Math.abs((serverTime % 1000) - 1000)
      setTimeout( () => { // Set timeout to full second ...
        let syncedTime = serverTime + toFullSecond
        // ... and start the accurate 1 second interval
        this.intervalController = setSelfAdjustingInterval(()=>{
            syncedTime = syncedTime + 1000
            console.log('clock tick')
            this.setState(()=>({
              serverTime: syncedTime,
              localTime: Date.now() // for debugging purposes
            }))
          }, 1000, () => console.log(`The drift exceeded the interval.`)
        ).start()
      }, toFullSecond)
    }

    updateInternalClock = () => {
      // Check if interval is already running and terminate it ...
      if (this.intervalController) this.intervalController = null
      // ... before setting it again
      pipeAsync( this.getServerTime, this.setInternalClock )()
    }

    // NOTE: Get more technical with median and implement this
    calculateAvarageLatency = values => {
      // 1. sort
      // 2. if more than 4 remove edges
      // 3. calculate average
    }

    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return (
        <div>
          <div className={'debug-controller'} >
            <div>
              <table>
                <tr>
                  <td>latency:</td><td>{this.state.latency}</td>
                </tr>
                <tr>
                  <td>server time:</td><td>{this.state.serverTime}</td>
                </tr>
                <tr>
                  <td>local time:</td><td>{this.state.localTime}</td>
                </tr>
              </table>
              <button onClick={this.updateInternalClock} >Sync server time</button>
            </div>
          </div>
          <App {...this.state} {...this.props}/>
        </div>
      )
    }
  }
}