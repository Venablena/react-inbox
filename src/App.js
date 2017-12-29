import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

import Toolbar from './components/Toolbar.js'
import MessageList from './components/MessageList.js'
import ComposeMsg from './components/ComposeMsg.js'

const API = 'http://localhost:8082/api/messages'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selection: [],
      compose: false
    }
  }

  enableCompose = () => {
    this.state.compose ? this.setState({compose: false}) : this.setState({compose: true})
  }

  composeMsg = async(e) => {
    e.preventDefault()
    const subject = e.target.subject.value
    const body = e.target.subject.value
    if(subject && body){
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        },
        body: JSON.stringify({subject, body})
      })
      const newMsg = await response.json()
      const posts = Object.assign({}, this.state)
      posts.selection.push(newMsg)
      posts.compose = false
      console.log(this.state);
      this.setState(posts)
    }
  }

  allChecked = () => {
    let posts = Object.assign({}, this.state)
    posts.selection.every(el => el.checked) ? posts.selection.map(el => el.checked = false) : posts.selection.map(el => el.checked = true)
    this.setState(posts)
  }

  check = (msgId, action) => {
    const posts = this.state.selection
    //find a post
    const match = posts.find(el => el.id === msgId)
    //mark it checked/unchecked OR read/unread
    match[action] ? match[action] = false : match[action] = true
    //update on the server(only if starred):
    if(match && action === "starred"){
      this.updateDb([msgId], "star", {"star": match[action]})
    }
    //update state:
    const newSelection = [...posts.slice(0, posts.indexOf(match)), match, ...posts.slice(posts.indexOf(match)+1)]

    this.setState({selection:newSelection})
  }

  trash = async(msgId) => {
    //copy current state
    const posts = Object.assign({}, this.state)
    //remove all selected posts from the db
    const id = this.state.selection.filter(el => el.checked).map(el => el.id)
    this.updateDb(id, "delete")
    //remove all selected posts from the state
    posts.selection.filter(el => el.checked).forEach(el =>{ posts.selection.splice(posts.selection.indexOf(el),1)
    })
    //update state
    this.setState(posts)
  }

  markRead = (value) => {
    let posts = Object.assign({}, this.state)
    posts.selection.filter(el => el.checked).map(el => el.read = value)
    const id = this.state.selection.filter(el => el.checked).map(el => el.id)
    this.updateDb(id, "read", {"read": value})
    this.setState(posts)
  }

  removeLabels = (e) => {
    let posts = Object.assign({}, this.state)
    posts.selection.filter(el => el.checked).forEach(el => {
      const idx = el.labels.indexOf(e.target.value)
      if(idx >= 0)el.labels.splice(idx, 1)
    })
    const id = this.state.selection.filter(el => el.checked).map(el => el.id)
    this.updateDb(id, "removeLabel", {"label": e.target.value})
    this.setState(posts)
  }

  addLabels = (e) => {
    let posts = Object.assign({}, this.state)
    posts.selection.filter(el => el.checked).forEach(el => {
      if(!el.labels.includes(e.target.value))el.labels.push(e.target.value)
    })
    const id = this.state.selection.filter(el => el.checked).map(el => el.id)
    this.updateDb(id, "addLabel", {"label": e.target.value})
    this.setState(posts)
  }

  async updateDb(id, command, value){
    let body = {
      "messageIds": id,
      "command": command
    }
    if(command !== "delete") body = Object.assign({}, body, value)
    console.log(body);
    await fetch(API, {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      },
      body: JSON.stringify(body)
    })
  }

  async componentDidMount(){
    const posts = await fetch(API)
    const response = await posts.json()
    const data = response._embedded.messages
    data.map(el => el.checked = false)
    this.setState({selection: data})
  }

//same without async, in promise format:
  // componentDidMount(){
  //   fetch('http://localhost:8082/api/messages')
  //     .then((result) => {
  //       console.log(result)
  //       result.json().then(response => {
  //         console.log(response)
  //       })
  //     })
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to my React inbox</h1>
          <p>Messages are loaded from a database. <br></br>You may select messages, mark them as read or starred, add and remove tags and delete messages.  <br></br>Your updates are saved into the database. <br></br>Composed messages will be added to the database and then to your inbox.</p>
        </header>
        <div className="container">
          <Toolbar
            msg = {this.state.selection}
            trash = {this.trash}
            markRead = {this.markRead}
            checkAll = {this.allChecked}
            removeLabels = {this.removeLabels}
            addLabels = {this.addLabels}
            compose = {this.enableCompose}/>
          <ComposeMsg
            composeMsg = {this.composeMsg}
            isActive = {this.state.compose}/>
          <MessageList
            msg = {this.state.selection}
            check = {this.check}
            />
        </div>
      </div>
    );
  }
}

export default App;
