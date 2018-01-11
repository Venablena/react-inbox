import { combineReducers } from 'redux'
import {
  ALL_MESSAGES,
  TOGGLE_COMPOSE
} from '../actions'
//selection is ALL messages, not just selected, fyi
const INITIAL_STATE = []

  export function renderMessages(state = INITIAL_STATE, action){

    switch (action.type) {
      case ALL_MESSAGES :
        return [...action.selection]
      default :
        return state
    }
  }

  function compose(state = false, action){
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
