import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  users: [],
  searchResults: [],
  searchBoxTouched: false
}

const search = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.SEARCHBOX_TOUCHED:
      return {
        ...state,
        searchBoxTouched: true
      }
    case actionTypes.SEARCHBOX_CLEAR:
      return {
        ...state,
        searchResults: []
      }
    case actionTypes.GET_USERS_INIT:
      return {
        ...state,
        loading: true,
        searchBoxTouched: false
      }
    case actionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...action.response]
      }
    case actionTypes.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: [...action.response]
      }
    case actionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...initialState,
      }
    default: 
      return state;
  }
}

export default search