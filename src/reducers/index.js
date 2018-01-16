import { combineReducers } from 'redux'
import {
  ALL_MESSAGES,
  TOGGLE_COMPOSE,
  CHECK_ONE,
  CHECK_ALL,
  TOGGLE_STAR,
  MARK_READ,
  MARK_UNREAD,
  TRASH,
  ADD_LABELS,
  REMOVE_LABELS
} from '../actions'

const INITIAL_STATE = []

  export function renderMessages(state = INITIAL_STATE, action){

    switch (action.type) {
      case ALL_MESSAGES :
        return [...action.messages]

      case CHECK_ONE :
        return state.map(msg => {
          //map all non-matching messages into a new array
          if(msg.id !== action.id) return msg
          //exception for the msg with a matching id: toggle its checked property
          if(!msg.checked) return {...msg, checked: true}
          return {...msg, checked: false}
        })

      case CHECK_ALL :
        return state.map(msg => {
          if(!msg.checked) return {...msg, checked: true}
          return {...msg, checked: false}
        })

      case TOGGLE_STAR :
        return state.map(msg => {
          if(msg.id !== action.id) return msg
          if(!msg.starred) return {...msg, starred: true}
          return {...msg, starred: false}
        })

      case MARK_READ :
        return state.map(msg => {
          if(!action.id.includes(msg.id)) return msg
          return {...msg, read: true}
        })

      case MARK_UNREAD :
        return state.map(msg => {
          if(!action.id.includes(msg.id)) return msg
          return {...msg, read: false}
        })

      case TRASH :
        return state.filter(msg => !action.id.includes(msg.id))

      case ADD_LABELS:
        return state.map(msg => {
          if((action.id.includes(msg.id)) && (!msg.labels.includes(action.label))) {
            return { ...msg, labels: [...msg.labels, action.label]}
          } else return msg
        })

      case REMOVE_LABELS:
        return state.map(msg => {
          if((action.id.includes(msg.id)) && (msg.labels.includes(action.label))) {
            let newLabels = msg.labels.filter(label => label !== action.label)
            return { ...msg, labels: newLabels }
          } else return msg
        })

      default:
        return state
    }
  }

  export function compose(state = false, action){
    switch (action.type) {
      case TOGGLE_COMPOSE :
        return !state
      default:
        return state
    }
  }

 export default combineReducers({
   renderMessages,
   compose
 })
