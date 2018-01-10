import { combineReducers } from 'redux'
import {
  ALL_MESSAGES
} from '../actions'
//selection is ALL messages, not just selected, fyi
const INITIAL_STATE = { selection: [], compose: false }

  export function renderMessages(state = INITIAL_STATE, action){
    switch (action.type) {
      case 'ALL_MESSAGES' :
        return [...action.selection]
      default:
       return state
    }
  }

 export default combineReducers({
   renderMessages
 })
