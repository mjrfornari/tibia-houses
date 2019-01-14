import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      name: ""
    }
    this.getHouse=this.getHouse.bind(this)
    this.doCORSRequest=this.doCORSRequest.bind(this)
    this.printResult=this.printResult.bind(this)
  }

  doCORSRequest(options, printResult) {
    var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() {
      printResult(
        (x.responseText || '')
      );
    };
    if (/^POST/i.test(options.method)) {
      x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
  }

  printResult(result) {
    let res = JSON.parse(result)
    console.log(res.house.status.owner_now)
    this.setState({
      name: res.house.status.owner_now
    })
  }

  getHouse(e) {
    e.preventDefault();

    this.doCORSRequest({
      method: 'GET',
      url: 'https://api.tibiadata.com/v2/house/Kalibra/50102.json',
    }, this.printResult);


    // fetch('https://api.tibiadata.com/v2/house/Kalibra/50102.json', {
    //   mode: 'no-cors',
    //   headers: new Headers({
    //     "Content-Type": "application/json",
    //   })
    // }).then( r=>console.log(r))
    //   r=>r.json()).then(r=>
    //   this.setState({
    //     name: r.house.status.owner_now
    //   })
    // )

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
