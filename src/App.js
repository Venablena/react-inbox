import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

import Toolbar from './components/Toolbar.js'
import MessageList from './components/MessageList.js'
import ComposeMsg from './components/ComposeMsg.js'

import { bindActionCreators } from 'redux'

import {
  fetchMessages,
  toggleCheck,
  toggleCompose,
  checkAll,
  toggleStar,
  markRead,
  markUnread
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

  toggleStar = (msgId, starred) => {
    this.props.toggleStar(msgId, starred)
  }

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

  markRead = (id) => {
    this.props.markRead(id)
  }

  markUnread = (id) => {
    this.props.markUnread(id)
  }

  removeLabels = (e) => {
    let posts = Object.assign({}, this.state)
    posts.messages.filter(el => el.checked).forEach(el => {
      const idx = el.labels.indexOf(e.target.value)
      if(idx >= 0)el.labels.splice(idx, 1)
    })
    const id = this.state.messages.filter(el => el.checked).map(el => el.id)
    // this.updateDb(id, "removeLabel", {"label": e.target.value})
    // this.setState(posts)
  }

  addLabels = (e) => {
    let posts = Object.assign({}, this.state)
    posts.messages.filter(el => el.checked).forEach(el => {
      if(!el.labels.includes(e.target.value))el.labels.push(e.target.value)
    })
    const id = this.state.messages.filter(el => el.checked).map(el => el.id)
    // this.updateDb(id, "addLabel", {"label": e.target.value})
    // this.setState(posts)
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
            checkAll = {this.allChecked}
            removeLabels = {this.removeLabels}
            addLabels = {this.addLabels}
            compose = {this.enableCompose}
            markRead = {this.markRead}
            markUnread = {this.markUnread}/>
          <ComposeMsg
            composeMsg = {this.composeMsg}
            isActive = {this.props.compose}/>
          <MessageList
            msg = {this.props.messages}
            check = {this.check}
            toggleStar = {this.toggleStar}
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

const dispatchToProps = dispatch => bindActionCreators({
  fetchMessages,
  toggleCompose,
  toggleCheck,
  checkAll,
  toggleStar,
  markRead,
  markUnread
}, dispatch)

export default connect(stateToProps, dispatchToProps)(App);
