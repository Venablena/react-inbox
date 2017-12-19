import React from 'react'

const Toolbar = ({msg, markRead, markUnread, trash, checkAll}) => {

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span>{ msg.filter(el => !el.read).length } </span>
          unread messages
        </p>

        <button className="btn btn-default">
          <i className="fa fa-square-o" onClick = {checkAll}></i>
        </button>

        <button className="btn btn-default selector" onClick = {()=>{markRead(msg.id)}}>
          Mark As Read
        </button>

        <button className="btn btn-default selector" onClick = {()=>{markUnread(msg.id)}}>
          Mark As Unread
        </button>

        <select className="form-control label-select selector">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select selector">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default selector" onClick = {()=>{trash(msg.id)}}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar
