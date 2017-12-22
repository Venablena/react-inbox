import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

import Toolbar from './components/Toolbar.js'
import MessageList from './components/MessageList.js'

const API = 'http://localhost:8082/api/messages'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {selection: []}
  }

  check = (msgId, action) => {
    //update state
    const posts = this.state.selection
    const match = posts.find(el => el.id === msgId)
    match[action] ? match[action] = false : match[action] = true
    const newSelection = [...posts.slice(0, posts.indexOf(match)), match, ...posts.slice(posts.indexOf(match)+1)]

    //re-render & set state
    this.setState({selection:newSelection})
  }

  trash = async (msgId) => {
    //copy current state
    const posts = Object.assign({}, this.state)

    console.log(posts.selection.filter(el => el.checked).map(el => el.id));
    //remove from database
    await fetch(API, {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      },
      body: JSON.stringify({
        "messageIds": posts.selection.filter(el => el.checked).map(el => el.id),
        "command": "delete"
      })
    })
    //remove all selected posts
    posts.selection.filter(el => el.checked).forEach(el =>{ posts.selection.splice(posts.selection.indexOf(el),1)
    })
  //update state
    this.setState(posts)
  }

  markRead = (value) => {
    let posts = Object.assign({}, this.state)
    posts.selection.filter(el => el.checked).map(el => el.read = value)
    this.setState(posts)
  }

  allChecked = () => {
    let posts = Object.assign({}, this.state)
    posts.selection.every(el => el.checked) ? posts.selection.map(el => el.checked = false) : posts.selection.map(el => el.checked = true)
    this.setState(posts)
  }

  removeLabels = (e) => {
    let posts = Object.assign({}, this.state)
    posts.selection.filter(el => el.checked).forEach(el => {
      const idx = el.labels.indexOf(e.target.value)
      if(idx >= 0)el.labels.splice(idx, 1)
    })
    this.setState(posts)
  }

  addLabels = (e) => {
    let posts = Object.assign({}, this.state)
    posts.selection.filter(el => el.checked).forEach(el => {
      if(!el.labels.includes(e.target.value))el.labels.push(e.target.value)
    })
    this.setState(posts)
  }

  async componentDidMount(){
    const posts = await fetch(API)
    const response = await posts.json()
    const data = response._embedded.messages.map(el => {
      const {id, subject, read, starred, labels} = el
        return {id, subject, read, starred, labels}
    })
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
        </header>
        <div className="container">
          <Toolbar
            msg = {this.state.selection}
            trash = {this.trash}
            markRead = {this.markRead}
            checkAll = {this.allChecked}
            removeLabels = {this.removeLabels}
            addLabels = {this.addLabels} />
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
