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
  removeLabels,
  sendMsg
} from './actions'

class App extends Component {

  enableCompose = (e) => {
    e.preventDefault()
    this.props.toggleCompose()
  }

  sendMsg = (e) => {
    e.preventDefault()
    const subject = e.target.subject.value
    const body = e.target.body.value
    if(subject && body)this.props.sendMsg(subject, body)
    else alert('Fill in the subject and body!')
    this.props.toggleCompose()
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
            enableCompose = {this.enableCompose}
            composeOn = {this.props.compose}
            markRead = {this.markRead}
            markUnread = {this.markUnread}/>
          <ComposeMsg
            sendMsg = {this.sendMsg}
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

const stateToProps = (state) => {
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
  removeLabels,
  sendMsg
}, dispatch)

export default connect(stateToProps, dispatchToProps)(App);
