import React from 'react'

const Message = ({msg, setStars, selection}) => {

  return (
    <div className = {
      msg.read ? "row message read" : "row message unread"
    }>
      <div className="col-xs-2">
        <input type="checkbox" value = {msg.id} />
      </div>
      <div className="col-xs-2">
        <i onClick={()=>{ setStars(msg.id) }} className= {
          msg.starred ? "star fa fa-star" : "star fa fa-star-o"
        }></i>
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
