import React from 'react'

const Message = ({msg}) => (
  <div className = {
    msg.read ? "row message read" : "row message unread"
  }>
  <div className="col-xs-1">
    <div className="row">
      <div className="col-xs-2">
        <input type="checkbox" />
      </div>
      <div className="col-xs-2">
        <i className= {
          msg.starred ? "star fa fa-star" : "star fa fa-star-o"
        }></i>
      </div>
    </div>
    <div className="col-xs-11">
      <a href="#">
        { msg.subject }
      </a>
    </div>
  </div>
</div>
);

export default Message
