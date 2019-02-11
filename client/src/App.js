import React, { Component } from 'react';
import axios from 'axios';

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

  componentDidMount() {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        this.setState({
          users: res.data.users
        })
      })
  }

  handleChange = e => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [e.target.name] : e.target.value
      }
    })
  }

  addUser = (e, user) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users', user)
        .then(res => {
          axios.get('http://localhost:5000/api/users')
            .then(res => {
              this.setState({
                users: res.data.users,
                newUser: {
                  name: '',
                  bio: ''
                }
              })
            })
        })
  }

  deleteUser = id => {

  }

  updateUser = (user, id) => {

  }

  render() {
    return (
      <div className="App">
        <>
          <form onSubmit={(e) => this.addUser(e, this.state.newUser)}>
            <input 
              type='text' 
              name='name' 
              onChange={this.handleChange} 
              value={this.state.newUser.name}
            />
            <input 
              type='text' 
              name='bio' 
              onChange={this.handleChange} 
              value={this.state.newUser.bio}
            />
            <button type='submit'>Add</button>
          </form>
          <div className='users'>
            {this.state.users.map(user => {
              return (
                <div key={user.id} className='user'>
                  <h2>{user.name}</h2>
                  <h3>{user.bio}</h3>
                  <div className='modify'>
                    <button onClick={this.deleteUser}>Delete</button>
                    <button onClick={this.updateUser}>Update</button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      </div>
    );
  }
}

export default App;
