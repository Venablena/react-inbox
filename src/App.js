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
  markUnread,
  trash,
  addLabels,
  removeLabels
} from './actions'


const URL = 'https://inbox-server.herokuapp.com'

class App extends Component {
  constructor(props){
    super(props)
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

  trash = (msgIds) => {
    this.props.trash(msgIds)
  }

  markRead = (ids) => {
    this.props.markRead(ids)
  }

  markUnread = (ids) => {
    this.props.markUnread(ids)
  }

  removeLabels = (e) => {
    const label = e.target.value
    let ids = this.props.messages
      .filter(message => message.checked)
      .filter(message => message.labels.includes(label))
      .map(message => message.id)
    this.props.removeLabels(ids, label)
  }

  addLabels = (e) => {
    const label = e.target.value
    let ids = this.props.messages
      .filter(message => message.checked)
      .filter(message => !message.labels.includes(label))
      .map(message => message.id)
    this.props.addLabels(ids, label)
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
            trash = {this.props.trash}
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
  markUnread,
  trash,
  addLabels,
  removeLabels
}, dispatch)

export default connect(stateToProps, dispatchToProps)(App);
