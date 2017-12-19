import React from 'react'

const howManyNew = (msg) => {
  const num = msg.filter(el => !el.read).length
  if (num === 1)return num + " new message"
  else return num + "  new messages"
}

const checkboxState = (msg) => {
  if(msg.every(el => el.checked)) return "fa fa-check-square-o"
  if(msg.some(el => el.checked)) return "fa fa-minus-square-o"
  else return "fa fa-square-o"
}

const selectValues = (msg) => {
  const selected = msg.filter(el => el.checked)
  selected.forEach(el => console.log(el.labels))
}

const Toolbar = ({msg, markRead, trash, checkAll}) => {
 console.log(msg.filter(el => el.checked).every(el => el.labels.length))
 selectValues(msg)
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span> {howManyNew(msg)} </span>
        </p>

        <button className="btn btn-default">
          <i className={checkboxState(msg)}
            onClick={checkAll}>
          </i>
        </button>

        <button className="btn btn-default" onClick = {()=>{markRead(true)}}
        disabled = {msg.filter(el => el.checked).every(el => el.read)}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick = {()=>{markRead(false)}} disabled = {msg.filter(el => el.checked).every(el => !el.read)}>
          Mark As Unread
        </button>

        <select className="form-control label-select" disabled = {!msg.some(el => el.checked)}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled = {msg.filter(el => el.checked).every(el => !el.labels.length)}>
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
