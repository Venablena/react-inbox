import React from 'react'
import Message from './Message.js'

const MessageList = ({msg, setStars, selection}) => (
  msg.map(el => <Message key = {el.id} msg = {el} setStars = {setStars} selection = {selection}/>)
)

export default MessageList
