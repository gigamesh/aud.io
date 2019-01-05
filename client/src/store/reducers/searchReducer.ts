import actionTypes from "../actions/actionTypes";
import { actionObj } from "../../typeDefs";

const initialState = {
  loading: false,
  users: [],
  searchResults: [],
  searchBoxTouched: false
};

const search = (state = initialState, action: actionObj) => {
  switch (action.type) {
    case actionTypes.SEARCHBOX_TOUCHED:
      return {
        ...state,
        searchBoxTouched: true
      };
    case actionTypes.SEARCHBOX_CLEAR:
      return {
        ...state,
        searchResults: []
      };
    case actionTypes.GET_USERS_INIT:
      return {
        ...state,
        loading: true,
        searchBoxTouched: false
      };
    case actionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...action.payload]
      };
    case actionTypes.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: [...action.payload]
      };
    case actionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default search;
