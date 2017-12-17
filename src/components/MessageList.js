import React from 'react'
import Message from './Message.js'

const MessageList = ({msg}) => (
  msg.map(el => <Message key = {el.id} msg = {el} />)
)

export default MessageList
