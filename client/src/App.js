import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      newUser: {
        name: '',
        bio: ''
      }
    }
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
