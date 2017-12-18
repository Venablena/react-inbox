import React from 'react'

const Toolbar = ({msg, change, selection}) => {
  const selectAll = (e) => {
    changeAppearance(e)
    //select(msg.find(el => el.id ===));
    console.log(e.target);
    // document.querySelectorAll("input[type=checkbox]").forEach(
    //   el => select({el})
    // )
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span>{ msg.filter(el => !el.read).length } </span>
          unread messages
        </p>

        <button className="btn btn-default">
          <i className="fa fa-square-o" onClick = {selectAll}></i>
        </button>

        <button className="btn btn-default selector" disabled="disabled">
          Mark As Read
        </button>

        <button className="btn btn-default selector" disabled="disabled">
          Mark As Unread
        </button>

        <select className="form-control label-select selector" disabled="disabled">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select selector" disabled="disabled">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default selector" disabled="disabled">
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

function changeAppearance(e){
  if(e.target.className === "fa fa-square-o") {
    e.target.className = "fa fa-check-square-o"
    document.querySelectorAll(".message").forEach(el =>
    el.classList.add("selected"))
    document.querySelectorAll(".selector").forEach(el =>
    el.disabled = false)
    document.querySelectorAll("input[type=checkbox]").forEach(el =>
    el.checked = true)
  }
  else {
    e.target.className = "fa fa-square-o"
    document.querySelectorAll(".message").forEach(el => el.classList.remove("selected"))
    document.querySelectorAll(".selector").forEach(el =>
    el.disabled = true)
    document.querySelectorAll("input[type=checkbox]").forEach(el =>
    el.checked = false)
  }
}

//
// function markRead() {
//   document.querySelectorAll("input[type=checkbox]").forEach(el => {
//     const match = msg.find(msg.id.toString() === el.value)
//     console.log(match))
//   }
// }
//
// function markUnread(e) {
//   document.querySelectorAll("input[type=checkbox checked=true]").forEach(el => el.read = true)
// }
//
// function trash(){
//   console.log("hey");
// }

export default Toolbar
