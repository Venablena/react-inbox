import React from 'react'

const checkboxState = (msg) => {
  if(msg.every(el => el.checked)) return "fa fa-check-square-o"
  if(msg.some(el => el.checked)) return "fa fa-minus-square-o"
  else return "fa fa-square-o"
}

const Toolbar = ({
  msg,
  trash,
  checkAll,
  removeLabels,
  addLabels,
  compose,
  markRead,
  markUnread
}) => {

  const checkedMsg = msg.filter(el => el.checked === true)

  const msgIds = checkedMsg.map(el => el.id)

console.log('msgIds:' + msgIds);
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge-default"> {msg.filter(el => !el.read).length} </span>
          {msg.filter(el => !el.read).length === 1 ? "new message" : "new messages"}
        </p>

        <a className="btn btn-danger" onClick={compose}>
         <i className="fa fa-plus"></i>
       </a>

        <button className="btn btn-default">
          <i className={checkboxState(msg)}
            onClick={checkAll}>
          </i>
        </button>

        <button className="btn btn-default" onClick = {()=>{markRead(msgIds)}}
        disabled = {checkedMsg.every(el => el.read)}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick = {()=>{markUnread(msgIds)}} disabled =  {checkedMsg.every(el => !el.read)}>
          Mark As Unread
        </button>

        <select className="form-control label-select" disabled = {!msg.some(el => el.checked)} onChange={addLabels}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={msg.filter(el => el.checked).every(el => !el.labels.length)} onChange={removeLabels}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick = {()=>{trash(msg.id)}} disabled = {!msg.some(el => el.checked)}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar
