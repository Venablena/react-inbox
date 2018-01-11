import React from 'react'
import Message from './Message.js'

const MessageList = ({msg, check, addLabels}) => (
  msg.map(el => <Message key = {el.id} msg = {el} check = {check} />)
)

export default MessageList
