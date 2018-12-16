import React, { Component } from 'react'
import './App.css'

import moment from 'moment'

class App extends Component {

  /**
   * Initialization
   */
  constructor(props) {
    super(props)
    this.state = {
      currentTick: 0,
      tickDuration: 2000, // Expressed in milliseconds
      clientCurrentTime: moment().format(`HH:mm:ss`),
      currentSeverTime: 0,
      iron: 0,
      ironModifier: 0
    }

    // Game loop interval
    // this.interval = setInterval(this.tick, this.state.tickDuration)

    // Server URL
    // this.serverUrl = `http://127.0.0.1:5000`
    this.serverUrl = `http://localhost:5000`

    this.updateIronModifier = this.updateIronModifier.bind(this)
    this.handleIronModifierChange = this.handleIronModifierChange.bind(this)
    this.getIron = this.getIron.bind(this)
  }

  componentWillMount () {
    // this.tick()
  }

  componentWillUnmount () {
    // clearInterval(this.interval)
  }


  /**
   * Resource (iron) Hooks
   */
  handleIronModifierChange (e) {
    e.preventDefault()
    this.setState({ironModifier: e.target.value});
  }
  async updateIronModifier (e) {
    e.preventDefault()

    console.log(this.state.ironModifier)

    fetch(`/api/resources/iron`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ironModifier: this.state.ironModifier
      })
    })
  }
  async getIron (e) {
    e.preventDefault()
    try {
      const res = await fetch(`/api/resources/iron`)
      const { base, modifier, last_update } = await res.json()
      this.setState( () => ({
        iron: base,
        ironModifier: modifier
      }))
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Game Loop
   */
  gameLoop = () => {}

  /**
   * UI
   */
  render() {
    return (
      <div className="App">
        <div>
          <p>controller:</p>
          <form onSubmit={this.updateIronModifier}>
            <label>
              Iron modifier:
              <input type="text" name="get" onChange={this.handleIronModifierChange}/>
            </label>
            <input type="submit" value="Update"/>
          </form>
          <button onClick={this.getIron} >get iron</button>
          <button onClick={this.getServerTime} >get server time</button>
        </div>
      </div>
    )
  }
}

export default App
