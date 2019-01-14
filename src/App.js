import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      name: ""
    }
    this.getHouse=this.getHouse.bind(this)
  }

  getHouse() {
    fetch('https://api.tibiadata.com/v2/house/Kalibra/50102.json').then(r=>r.json()).then(r=>
      this.setState({
        name: r.house.status.owner_now
      })
    )

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.getHouse}>Get info!</button>
          <br/>
          {this.state.name}
        </header>
      </div>
    );
  }
}

export default App;
