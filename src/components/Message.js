import React from 'react'

function rowName(msg){
  let name = "row message"
  msg.read ? name =  `${name} read` : name = `${name} unread`
  msg.checked ? name = `${name} selected`: name = `${name}`

  return name
}

const Message = ({msg, check, selection}) => {
  return (
    <div  className= {rowName(msg)}>
      <div className="col-xs-2">
      <input type="checkbox" onChange= {()=>{check(msg.id, "checked")}}/>
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

export default Message
