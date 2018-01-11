const URL = 'https://inbox-server.herokuapp.com'

export const ALL_MESSAGES = 'ALL_MESSAGES'
export const TOGGLE_COMPOSE = 'TOGGLE_COMPOSE'
export const CHECK_ONE = 'CHECK_ONE'
export const CHECK_ALL = 'CHECK_ALL'

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

/*export const composeMsg = (e) => {
  e.preventDefault()
  return async (dispatch) => {
    const subject = e.target.subject.value
    const body = e.target.subject.value
    if(subject && body){
     const response = await fetch(`${URL}/api/messages`, {
       method: 'POST',
       headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
       },
       body: JSON.stringify({subject, body})
     })
     const newMsg = await response.json()
     const posts = Object.assign({}, this.state)
     posts.selection.push(newMsg)
     posts.compose = false
     this.setState(posts)
   }
  }
}
 ACTIONS
async updateDb(id, command, value){
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
*/
