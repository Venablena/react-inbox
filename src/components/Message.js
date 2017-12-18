import React from 'react'

const Message = ({msg}) => {
  const stars = (e) => {
    //const match = msg.find(e.target.id === msg.id.toString())
    msg.e.target.id.starred ? msg.starred = false : msg.starred = true
  }
  return (
    <div className = {
      msg.read ? "row message read" : "row message unread"
    }>
      <div className="col-xs-2">
        <input type="checkbox" value = {msg.id}/>
      </div>
      <div className="col-xs-2">
        <i className= {
          msg.starred ? "star fa fa-star" : "star fa fa-star-o"
        } onClick={stars} id = {msg.id}></i>
      </div>

    <div className="col-xs-8">
      <a href="#">
        {msg.subject}
      </a>
    </div>

  </div>
  );
}

export default Message
