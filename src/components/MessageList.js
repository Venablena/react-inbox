import React from 'react'
import Message from './Message.js'

const MessageList = ({msg, check, selection}) => (
  msg.map(el => <Message key = {el.id} msg = {el} check = {check} selection = {selection}/>)
)

export default MessageList
