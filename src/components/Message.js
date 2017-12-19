import React from 'react'

const Message = ({msg, check, selection}) => {
  return (
    <div className = {
      msg.read ? "row message read" : "row message unread"
    }>
      <div className="col-xs-2">
        <input type="checkbox" onChange= {()=>{check(msg.id, "checked")}}
        }/>
      </div>
      <div className="col-xs-2">
        <i onClick={()=>{check(msg.id, "starred")}} className= {
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
 function(){}

export default Message
