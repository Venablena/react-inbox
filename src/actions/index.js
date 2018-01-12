const URL = 'http://localhost:8082'

export const ALL_MESSAGES = 'ALL_MESSAGES'
export const TOGGLE_COMPOSE = 'TOGGLE_COMPOSE'
export const CHECK_ONE = 'CHECK_ONE'
export const CHECK_ALL = 'CHECK_ALL'
export const TOGGLE_STAR = 'TOGGLE_STAR'
export const MARK_READ = 'MARK_READ'
export const MARK_UNREAD = 'MARK_UNREAD'
export const TRASH = 'TRASH'

const updateDb = async (id, command, value) => {
  console.log('updateDB-id:', id);
  let body = {
    "messageIds": id,
    "command": command
  }
  if(command !== "delete") body = Object.assign({}, body, value)
  console.log(body);
  await fetch(`${URL}/api/messages`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    },
    body: JSON.stringify(body)
  })
}

export const fetchMessages = () => {
  return async (dispatch) => {
    const posts = await fetch(`${URL}/api/messages`)
    const response = await posts.json()
    const data = response._embedded.messages
    data.map(el => el.checked = false)

    dispatch({
      type: ALL_MESSAGES,
      messages: data
    })
  }
}

export const toggleCompose = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_COMPOSE
    })
  }
}

export const toggleCheck = (id) => {
  return (dispatch) => {
    dispatch({
      type: CHECK_ONE,
      id
    })
  }
}

export const checkAll = () => {
  return (dispatch) => {
    dispatch({
      type: CHECK_ALL
    })
  }
}

export const toggleStar = (id, starred) => {
  return async (dispatch) => {
    updateDb([id], "star", {"star": !starred})
    dispatch({
      type: TOGGLE_STAR,
      id
    })
  }
}

export const markRead = (ids) => {
  console.log('action.id in actions:' + ids)
  return async (dispatch) => {
    updateDb(ids, "read", {"read": true})
    dispatch({
      type: MARK_READ,
      id: ids
    })
  }
}

export const markUnread = (ids) => {
  return async (dispatch) => {
    updateDb(ids, "read", {"read": false})
    dispatch({
      type: MARK_UNREAD,
      id: ids
    })
  }
}

export const trash = (ids) => {
  return async (dispatch) => {
    updateDb(ids, "delete")
    dispatch({
      type: TRASH,
      id: ids
    })
  }
}

/*
trash = async(msgId) => {
  //copy current state
  const posts = Object.assign({}, this.state)
  //remove all selected posts from the db
  const id = this.state.messages.filter(el => el.checked).map(el => el.id)
  this.updateDb(id, "delete")
  //remove all selected posts from the state
  posts.messages.filter(el => el.checked).forEach(el =>{ posts.messages.splice(posts.messages.indexOf(el),1)
  })
  //update state
  this.setState(posts)
}
*/
