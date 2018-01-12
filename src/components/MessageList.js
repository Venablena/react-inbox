import React from 'react'
import Message from './Message.js'

const MessageList = ({
    msg,
    check,
    addLabels,
    toggleStar
}) => (
  msg.map(el => <Message
                  key = {el.id}
                  msg = {el}
                  check = {check}
                  toggleStar = {toggleStar}/>)
)

export default MessageList
