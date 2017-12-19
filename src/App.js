import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

import Toolbar from './components/Toolbar.js'
import MessageList from './components/MessageList.js'

const data = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

class App extends Component {
  constructor(props){
    super(props)
    data.map(el => el.checked = false)
    this.state = {selection: data}
  }

  change = (post) => {
    this.setState({
      selection: [
        post,
        ...this.state.selection
      ]
    })
  }

  check = (msgId, action) => {
    const posts = this.state.selection
    const match = posts.find(el => el.id === msgId)
    match[action] ? match[action] = false : match[action] = true
    const newSelection = [...posts.slice(0, posts.indexOf(match)), match, ...posts.slice(posts.indexOf(match)+1)]
    this.setState({selection:newSelection})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to my React inbox</h1>
        </header>
        <div className="container">
          <Toolbar msg = {this.state.selection} change = {this.change} />
          <MessageList msg = {this.state.selection} check={this.check} selection={this.state.selection} />
        </div>
      </div>
    );
  }
}

export default App;
