import { combineReducers } from 'redux';
import user from './userReducer'
import search from './searchReducer.js'

const rootReducer = combineReducers({
  user,
  search
});

export default rootReducer