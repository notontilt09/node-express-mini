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
        bio: '',
      },
      isUpdating: false,
      updatingId: null
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

  addUser = user => {
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

  deleteUser = (e, id) => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        axios.get('http://localhost:5000/api/users')
          .then(res => {
            this.setState({
              users: res.data.users
            })
          })
      });
  }

  updateUser = () => {
    const toBeUpdated = this.state.users.find(x => x.id === this.state.updatingId);
    console.log(toBeUpdated);
    axios.put(`http://localhost:5000/api/users/${toBeUpdated.id}`, this.state.newUser)
      .then(res => {
        axios.get('http://localhost:5000/api/users')
          .then(res => {
            this.setState({
              users: res.data.users
            })
          })
      })
  }

  populateForm = (e, user) => {
    e.preventDefault();
    this.setState({
      newUser: {
        name: user.name,
        bio: user.bio,
      },
      isUpdating: true,
      updatingId: user.id
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.isUpdating) {
      this.updateUser()
      this.setState({
        isUpdating: false,
        newUser: {
          name: '',
          bio: ''
        },
        updatingId: null
      })
    } else {
      this.addUser(this.state.newUser)
    }
  }

  render() {
    return (
      <div className="App">
        <>
          <form onSubmit={this.handleSubmit}>
            <input 
              type='text' 
              name='name' 
              onChange={this.handleChange} 
              value={this.state.newUser.name}
              placeholder='name'
            />
            <input 
              type='text' 
              name='bio' 
              onChange={this.handleChange} 
              value={this.state.newUser.bio}
              placeholder='bio'
            />
            <button type='submit'>{this.state.isUpdating ? 'Update' : 'Add'}</button>
          </form>
          <div className='users'>
            {this.state.users.map(user => {
              return (
                <div key={user.id} className='user'>
                  <h2>{user.name}</h2>
                  <h3>{user.bio}</h3>
                  <div className='modify'>
                    <button onClick={(e) => this.deleteUser(e, user.id)}>Delete</button>
                    <button onClick={(e) => this.populateForm(e, user)}>Update</button>
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
