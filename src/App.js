import React, { Component } from 'react'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      iron: 0,
      ironModifier: 0
    }
  }

  handleIronModifierChange = (e) => {
    e.preventDefault()
    this.setState({ironModifier: e.target.value});
  }
  updateIronModifier = async (e) => {
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
  getIron = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/resources/iron`)
      const { base, modifier, last_update } = await res.json()
      this.setState( () => ({
        iron: base,
        ironModifier: modifier,
        last_update
      }))
    } catch (err) {
      console.log(err)
    }
  }

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
