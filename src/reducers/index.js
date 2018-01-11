import { combineReducers } from 'redux'
import {
  ALL_MESSAGES,
  TOGGLE_COMPOSE,
  CHECK_ONE,
  CHECK_ALL
} from '../actions'
//selection is ALL messages, not just selected, fyi
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
