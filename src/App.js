import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

import Toolbar from './components/Toolbar.js'
import MessageList from './components/MessageList.js'
import ComposeMsg from './components/ComposeMsg.js'

import {
  fetchMessages,
  toggleCheck,
  toggleCompose,
  checkAll
} from './actions'

const URL = 'https://inbox-server.herokuapp.com'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      messages: [],
      compose: false
    }
  }

  enableCompose = (e) => {
    e.preventDefault()
    this.props.toggleCompose()
  }

  composeMsg = async(e) => {
    e.preventDefault()
    const subject = e.target.subject.value
    const body = e.target.subject.value
    if(subject && body){
      const response = await fetch(`${URL}/api/messages`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        },
        body: JSON.stringify({subject, body})
      })
      const newMsg = await response.json()
      const posts = Object.assign({}, this.state)
      posts.messages.push(newMsg)
      posts.compose = false
      this.setState(posts)
    }
  }

  allChecked = () => {
    this.props.checkAll()
  }

  check = (msgId) => {
    this.props.toggleCheck(msgId)
  }
  // check = (msgId, action) => {
  //   const posts = this.state.messages
  //   //find a post
  //   const match = posts.find(el => el.id === msgId)
  //   //mark it checked/unchecked OR read/unread
  //   match[action] ? match[action] = false : match[action] = true
  //   //update on the server(only if starred):
  //   if(match && action === "starred"){
  //     this.updateDb([msgId], "star", {"star": match[action]})
  //   }

  trash = async(msgId) => {
    //copy current state
    const posts = Object.assign({}, this.state)
    //remove all selected posts from the db
    const id = this.state.messages.filter(el => el.checked).map(el => el.id)
    this.updateDb(id, "delete")
    //remove all selected posts from the state
    posts.messages.filter(el => el.checked).forEach(el =>{ posts.messages.splice(posts.messages.indexOf(el),1)
    })
    //update state
    this.setState(posts)
  }

  markRead = (value) => {
    let posts = Object.assign({}, this.state)
    posts.messages.filter(el => el.checked).map(el => el.read = value)
    const id = this.state.messages.filter(el => el.checked).map(el => el.id)
    this.updateDb(id, "read", {"read": value})
    this.setState(posts)
  }

  removeLabels = (e) => {
    let posts = Object.assign({}, this.state)
    posts.messages.filter(el => el.checked).forEach(el => {
      const idx = el.labels.indexOf(e.target.value)
      if(idx >= 0)el.labels.splice(idx, 1)
    })
    const id = this.state.messages.filter(el => el.checked).map(el => el.id)
    this.updateDb(id, "removeLabel", {"label": e.target.value})
    this.setState(posts)
  }

  addLabels = (e) => {
    let posts = Object.assign({}, this.state)
    posts.messages.filter(el => el.checked).forEach(el => {
      if(!el.labels.includes(e.target.value))el.labels.push(e.target.value)
    })
    const id = this.state.messages.filter(el => el.checked).map(el => el.id)
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
    await fetch(`${URL}/api/messages`, {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      },
      body: JSON.stringify(body)
    })
  }

  componentDidMount() {
      this.props.fetchMessages()
    }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to my React inbox</h1>
          <p>Messages are loaded from a database. <br></br>You may select messages, mark them as read or starred, add and remove tags and delete messages.  <br></br>Your updates are saved into the database. <br></br>Composed messages will be added to the database and then to your inbox.</p>
        </header>
        <div className="container">
          <Toolbar
            msg = {this.props.messages}
            trash = {this.trash}
            markRead = {this.markRead}
            checkAll = {this.allChecked}
            removeLabels = {this.removeLabels}
            addLabels = {this.addLabels}
            compose = {this.enableCompose}/>
          <ComposeMsg
            composeMsg = {this.composeMsg}
            isActive = {this.props.compose}/>
          <MessageList
            msg = {this.props.messages}
            check = {this.check}
            />
        </div>
      </div>
    );
  }
}

function stateToProps(state){
  return {
    messages: state.renderMessages,
    compose: state.compose
  }
}

const dispatchToProps = dispatch => ({
  fetchMessages: () => fetchMessages(dispatch),
  toggleCompose: () => toggleCompose()(dispatch),
  toggleCheck: (id) => toggleCheck(id) (dispatch),
  checkAll: () => checkAll()(dispatch)
})

export default connect(stateToProps, dispatchToProps)(App);
