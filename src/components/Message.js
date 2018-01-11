import React from 'react'

const rowName = (msg) => {
  let name = "row message"
  msg.read ? name =  `${name} read` : name = `${name} unread`
  msg.checked ? name = `${name} selected`: name = `${name}`
  return name
}

const Message = ({msg, check}) => {

  return (
    <div  className= {rowName(msg)}>
      <div className ="col-1">
        <div className = "row">
          <div className="col-6">
            <input type="checkbox"
              onChange= {()=>{check(msg.id, "checked")}}
              checked = {msg.checked}
              />
          </div>
          <div className="col-6">
            <i onClick={()=>{check(msg.id, "starred")}}
              className= {"star fa fa-star" + (msg.starred ?  "" : "-o")}>
            </i>
          </div>
        </div>
      </div>
    <div className="col-11">
      {msg.labels.map((label, i)=> <span key={i} className="badge badge-warning">{label}</span>)}
      <a href={msg._links.self}>
        {msg.subject}
      </a>
    </div>

  </div>
  );
}

export default Message
